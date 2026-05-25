-- À exécuter dans Supabase → SQL Editor si la connexion échoue (email non confirmé)
-- Remplacez l'email ci-dessous par le vôtre

UPDATE auth.users
SET
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  updated_at = NOW()
WHERE email = 'jesner.landa@gmail.com';
