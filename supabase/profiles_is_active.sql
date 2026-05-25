-- Activation / désactivation des comptes clients (espace admin)
-- Exécuter dans Supabase → SQL Editor

alter table public.profiles
  add column if not exists is_active boolean not null default true;

comment on column public.profiles.is_active is
  'false = le client ne peut plus se connecter';

-- Comptes existants : actifs par défaut
update public.profiles set is_active = true where is_active is null;
