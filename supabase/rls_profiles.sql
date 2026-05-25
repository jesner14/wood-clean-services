-- À exécuter dans l'éditeur SQL Supabase (minimum pour l'authentification Phase 1)
-- Active RLS et permet à chaque utilisateur de lire son profil

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin : lecture de tous les profils (remplacer par une fonction is_admin si besoin)
create policy "Admins can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
