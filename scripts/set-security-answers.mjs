/**
 * Enregistre les réponses de sécurité pour un utilisateur existant.
 * Usage: pnpm set-security-answers email reponse1 reponse2 reponse3
 */

import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, ' ');
}

async function hashAnswer(value) {
  return bcrypt.hash(normalize(value), 10);
}

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

const [email, ...answers] = process.argv.slice(2);

if (!email || answers.length !== 3) {
  console.error('Usage: pnpm set-security-answers <email> <reponse1> <reponse2> <reponse3>');
  process.exit(1);
}

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('VITE_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis dans .env.local');
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: listData, error: listError } = await admin.auth.admin.listUsers({
  page: 1,
  perPage: 1000,
});

if (listError) {
  console.error('Erreur:', listError.message);
  process.exit(1);
}

const user = listData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
if (!user) {
  console.error('Utilisateur introuvable:', email);
  process.exit(1);
}

const [h1, h2, h3] = await Promise.all(answers.map((a) => hashAnswer(a)));

const { error } = await admin.from('user_security_answers').upsert({
  user_id: user.id,
  answer_1_hash: h1,
  answer_2_hash: h2,
  answer_3_hash: h3,
  updated_at: new Date().toISOString(),
});

if (error) {
  console.error('Erreur base:', error.message);
  console.error('Avez-vous exécuté supabase/user_security_answers.sql ?');
  process.exit(1);
}

console.log('Réponses enregistrées pour', email);
console.log('(normalisées : minuscules, sans accents, espaces réduits)');
