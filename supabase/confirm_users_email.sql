-- Active tous les comptes sans confirmation par email
-- À exécuter une fois dans Supabase → SQL Editor

update auth.users
set
  email_confirmed_at = coalesce(email_confirmed_at, now()),
  confirmed_at = coalesce(confirmed_at, now())
where email_confirmed_at is null;

-- Un seul compte (exemple)
-- update auth.users
-- set email_confirmed_at = now(), confirmed_at = now()
-- where email = 'jesner.landa@gmail.com';
