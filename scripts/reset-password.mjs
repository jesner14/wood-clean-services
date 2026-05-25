/**
 * Réinitialise le mot de passe sans email (développement).
 * Usage: pnpm reset-password email@gmail.com NouveauMotDePasse123
 */

import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  const text = readFileSync('.env.local', 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
}

loadEnvLocal();

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.error('Usage: pnpm reset-password <email> <nouveau-mot-de-passe>');
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

if (!user) {
  console.error('Utilisateur introuvable:', email);
  process.exit(1);
}

const { error } = await admin.auth.admin.updateUserById(user.id, { password });
if (error) {
  console.error('Erreur:', error.message);
  process.exit(1);
}

console.log('Mot de passe mis à jour pour', email);
console.log('Connectez-vous sur /connexion');
