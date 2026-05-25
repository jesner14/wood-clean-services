-- Questions de sécurité (réponses hashées côté serveur)
-- Exécuter dans Supabase → SQL Editor

create table if not exists public.user_security_answers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  answer_1_hash text not null,
  answer_2_hash text not null,
  answer_3_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_security_answers enable row level security;

-- Aucune policy : lecture/écriture uniquement via service_role (API serveur)
