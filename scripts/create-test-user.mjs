/**
 * Crée un utilisateur confirmé sans envoyer d'email (contourne la limite Supabase).
 *
 * Usage:
 *   pnpm create-user email@exemple.com MotDePasse123 "Nom complet"
 *
 * Prérequis dans .env.local :
 *   VITE_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...  (Dashboard → Settings → API → service_role)
 */

import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  try {
    const text = readFileSync('.env.local', 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.error('Fichier .env.local introuvable.');
    process.exit(1);
  }
}

loadEnvLocal();

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const [email, password, ...nameParts] = process.argv.slice(2);
const fullName = nameParts.join(' ') || email;

if (!email || !password) {
  console.error('Usage: pnpm create-user <email> <mot-de-passe> [nom complet]');
  process.exit(1);
}

if (!url || !serviceKey) {
  console.error(
    'Ajoutez VITE_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local\n' +
      '(service_role : Supabase → Project Settings → API → service_role secret)'
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { full_name: fullName },
});

if (error) {
  console.error('Erreur:', error.message);
  process.exit(1);
}

console.log('Compte créé et confirmé (aucun email envoyé).');
console.log('  Email   :', email);
console.log('  ID      :', data.user?.id);
console.log('Connectez-vous sur http://localhost:5173/connexion');
