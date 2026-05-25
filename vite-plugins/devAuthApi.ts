import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import { loadEnv } from 'vite';
import { createClient } from '@supabase/supabase-js';
import { hashAnswers, verifyAnswers } from './securityCrypto';

const API_PATHS = new Set([
  '/api/register',
  '/api/reset-password',
  '/api/security-answers',
  '/api/reset-password-security',
  '/api/confirm-email',
  '/api/quote-request',
]);

function send(res: ServerResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });
}

async function findUserByEmail(
  admin: ReturnType<typeof createClient>,
  email: string
) {
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw error;
  return data.users.find((u) => u.email?.toLowerCase() === email);
}

async function saveAnswersForUser(
  admin: ReturnType<typeof createClient>,
  userId: string,
  answers: string[]
) {
  const [h1, h2, h3] = await hashAnswers(answers);
  const { error } = await admin.from('user_security_answers').upsert({
    user_id: userId,
    answer_1_hash: h1,
    answer_2_hash: h2,
    answer_3_hash: h3,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

/** APIs locales auth (service_role) */
export function devAuthApi(): Plugin {
  return {
    name: 'dev-auth-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || !req.url?.startsWith('/api/')) {
          next();
          return;
        }

        const path = req.url.split('?')[0];
        if (!API_PATHS.has(path)) {
          next();
          return;
        }

        try {
          const env = loadEnv('development', process.cwd(), '');
          const url = env.VITE_SUPABASE_URL;
          const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

          if (!url || !serviceKey) {
            send(res, 500, {
              error: 'Ajoutez SUPABASE_SERVICE_ROLE_KEY dans .env.local',
            });
            return;
          }

          const body = JSON.parse(await readBody(req));
          const admin = createClient(url, serviceKey, {
            auth: { autoRefreshToken: false, persistSession: false },
          });

          if (path === '/api/quote-request') {
            const full_name = String(body.full_name || '').trim();
            const email = String(body.email || '').trim().toLowerCase();
            const service = String(body.service || '').trim();
            const message = String(body.message || '').trim();
            const phone = body.phone ? String(body.phone).trim() : null;

            if (!full_name || !email || !service || !message) {
              send(res, 400, { error: 'Tous les champs obligatoires doivent être remplis.' });
              return;
            }

            const { error: insertError } = await admin.from('quote_requests').insert({
              full_name,
              phone,
              email,
              service,
              message,
              status: 'new',
            });

            if (insertError) {
              send(res, 400, {
                error: insertError.message.includes('quote_requests')
                  ? 'Exécutez supabase/quote_requests.sql dans Supabase.'
                  : insertError.message,
              });
              return;
            }

            send(res, 200, { ok: true });
            return;
          }

          if (path === '/api/confirm-email') {
            const email = String(body.email || '')
              .trim()
              .toLowerCase();
            if (!email) {
              send(res, 400, { error: 'Email requis.' });
              return;
            }
            const user = await findUserByEmail(admin, email);
            if (!user) {
              send(res, 404, { error: 'Utilisateur introuvable.' });
              return;
            }
            const { error: confirmError } = await admin.auth.admin.updateUserById(user.id, {
              email_confirm: true,
            });
            if (confirmError) {
              send(res, 400, { error: confirmError.message });
              return;
            }
            send(res, 200, { ok: true });
            return;
          }

          if (path === '/api/security-answers') {
            const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
            if (!token) {
              send(res, 401, { error: 'Non authentifié.' });
              return;
            }
            const { data: userData, error: userError } = await admin.auth.getUser(token);
            if (userError || !userData.user) {
              send(res, 401, { error: 'Session invalide.' });
              return;
            }
            const answers = body.answers as string[];
            if (!Array.isArray(answers) || answers.length !== 3) {
              send(res, 400, { error: 'Trois réponses requises.' });
              return;
            }
            await saveAnswersForUser(admin, userData.user.id, answers);
            send(res, 200, { ok: true });
            return;
          }

          if (path === '/api/reset-password-security') {
            const email = String(body.email || '')
              .trim()
              .toLowerCase();
            const password = String(body.password || '');
            const answers = body.answers as string[];

            if (!email || password.length < 6 || !Array.isArray(answers) || answers.length !== 3) {
              send(res, 400, { error: 'Email, mot de passe et 3 réponses requis.' });
              return;
            }

            const user = await findUserByEmail(admin, email);
            if (!user) {
              send(res, 400, { error: 'Réponses incorrectes ou compte introuvable.' });
              return;
            }

            const { data: row, error: rowError } = await admin
              .from('user_security_answers')
              .select('answer_1_hash, answer_2_hash, answer_3_hash')
              .eq('user_id', user.id)
              .maybeSingle();

            if (rowError || !row) {
              send(res, 400, {
                error: 'Aucune question de sécurité enregistrée pour ce compte.',
              });
              return;
            }

            const valid = await verifyAnswers(answers, row);
            if (!valid) {
              send(res, 400, { error: 'Réponses de sécurité incorrectes.' });
              return;
            }

            const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
              password,
            });
            if (updateError) {
              send(res, 400, { error: updateError.message });
              return;
            }

            send(res, 200, { ok: true });
            return;
          }

          const email = String(body.email || '')
            .trim()
            .toLowerCase();
          const password = String(body.password || '');

          if (!email || password.length < 6) {
            send(res, 400, { error: 'Email et mot de passe (6 caractères min.) requis.' });
            return;
          }

          if (path === '/api/register') {
            const answers = body.answers as string[] | undefined;
            const { data: created, error } = await admin.auth.admin.createUser({
              email,
              password,
              email_confirm: true,
              user_metadata: { full_name: String(body.full_name || '').trim() },
            });
            if (error) {
              const msg = error.message.includes('already been registered')
                ? 'Un compte existe déjà avec cet email.'
                : error.message;
              send(res, 400, { error: msg });
              return;
            }
            if (answers?.length === 3 && created.user) {
              await saveAnswersForUser(admin, created.user.id, answers);
            }
            send(res, 200, { ok: true });
            return;
          }

          const user = await findUserByEmail(admin, email);
          if (!user) {
            send(res, 404, { error: 'Aucun compte avec cet email.' });
            return;
          }

          const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
            password,
          });
          if (updateError) {
            send(res, 400, { error: updateError.message });
            return;
          }

          send(res, 200, { ok: true });
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Erreur serveur';
          send(res, 500, { error: msg });
        }
      });
    },
  };
}
