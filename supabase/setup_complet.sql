-- =============================================================================
-- Wood Clean Services — Script SQL complet
-- À exécuter dans Supabase → SQL Editor (Run)
-- Peut être relancé : les policies existantes sont supprimées avant recréation
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Tables (si pas déjà créées — sinon cette partie peut échouer, c'est normal)
-- -----------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  role text check (role in ('admin', 'client')) default 'client',
  email text not null,
  full_name text,
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles
  add column if not exists is_active boolean not null default true;

create table if not exists public.quote_items (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  unit_price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.quotes (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.profiles(id) not null,
  status text check (status in ('pending', 'modified', 'validated', 'accepted', 'invoiced')) default 'pending',
  total_amount numeric(10,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.quote_lines (
  id uuid default gen_random_uuid() primary key,
  quote_id uuid references public.quotes(id) on delete cascade not null,
  quote_item_id uuid references public.quote_items(id) not null,
  quantity integer not null default 1,
  unit_price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.invoices (
  id uuid default gen_random_uuid() primary key,
  quote_id uuid references public.quotes(id) not null,
  client_id uuid references public.profiles(id) not null,
  status text check (status in ('unpaid', 'paid')) default 'unpaid',
  total_amount numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- -----------------------------------------------------------------------------
-- 2. Trigger : profil automatique à l'inscription
-- -----------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'client'
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), profiles.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Profils manquants pour utilisateurs déjà créés
insert into public.profiles (id, email, full_name, role)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data->>'full_name', ''),
  'client'
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id)
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
-- 3. Fonction helper admin (évite les boucles RLS)
-- -----------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- -----------------------------------------------------------------------------
-- 4. RLS — profiles
-- -----------------------------------------------------------------------------

alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can read all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins can read all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Admins can update all profiles"
  on public.profiles for update
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- 5. RLS — quote_items (catalogue)
-- -----------------------------------------------------------------------------

alter table public.quote_items enable row level security;

drop policy if exists "Authenticated can read quote items" on public.quote_items;
drop policy if exists "Admins manage quote items" on public.quote_items;

create policy "Authenticated can read quote items"
  on public.quote_items for select
  to authenticated
  using (true);

create policy "Admins manage quote items"
  on public.quote_items for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- 6. RLS — quotes (devis)
-- -----------------------------------------------------------------------------

alter table public.quotes enable row level security;

drop policy if exists "Clients read own quotes" on public.quotes;
drop policy if exists "Clients insert own quotes" on public.quotes;
drop policy if exists "Admins manage all quotes" on public.quotes;

create policy "Clients read own quotes"
  on public.quotes for select
  to authenticated
  using (client_id = auth.uid() or public.is_admin());

create policy "Clients insert own quotes"
  on public.quotes for insert
  to authenticated
  with check (client_id = auth.uid());

create policy "Admins manage all quotes"
  on public.quotes for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- 7. RLS — quote_lines (lignes de devis)
-- -----------------------------------------------------------------------------

alter table public.quote_lines enable row level security;

drop policy if exists "Users read quote lines of accessible quotes" on public.quote_lines;
drop policy if exists "Clients insert lines on own quotes" on public.quote_lines;
drop policy if exists "Admins manage quote lines" on public.quote_lines;

create policy "Users read quote lines of accessible quotes"
  on public.quote_lines for select
  to authenticated
  using (
    exists (
      select 1 from public.quotes q
      where q.id = quote_lines.quote_id
        and (q.client_id = auth.uid() or public.is_admin())
    )
  );

create policy "Clients insert lines on own quotes"
  on public.quote_lines for insert
  to authenticated
  with check (
    exists (
      select 1 from public.quotes q
      where q.id = quote_lines.quote_id and q.client_id = auth.uid()
    )
  );

create policy "Admins manage quote lines"
  on public.quote_lines for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- 8. RLS — invoices (factures)
-- -----------------------------------------------------------------------------

alter table public.invoices enable row level security;

drop policy if exists "Clients read own invoices" on public.invoices;
drop policy if exists "Admins manage invoices" on public.invoices;

create policy "Clients read own invoices"
  on public.invoices for select
  to authenticated
  using (client_id = auth.uid() or public.is_admin());

create policy "Admins manage invoices"
  on public.invoices for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- 9. Demandes de devis (formulaire public contact#devis)
-- -----------------------------------------------------------------------------

create table if not exists public.quote_requests (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  phone text,
  email text not null,
  service text not null,
  message text not null,
  status text check (status in ('new', 'read', 'archived')) default 'new' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);

alter table public.quote_requests enable row level security;

drop policy if exists "Public can submit quote requests" on public.quote_requests;
drop policy if exists "Admins read quote requests" on public.quote_requests;
drop policy if exists "Admins update quote requests" on public.quote_requests;

create policy "Public can submit quote requests"
  on public.quote_requests for insert
  to anon, authenticated
  with check (true);

create policy "Admins read quote requests"
  on public.quote_requests for select
  to authenticated
  using (public.is_admin());

create policy "Admins update quote requests"
  on public.quote_requests for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- 10. Questions de sécurité (réponses hashées — accès service_role uniquement)
-- -----------------------------------------------------------------------------

create table if not exists public.user_security_answers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  answer_1_hash text not null,
  answer_2_hash text not null,
  answer_3_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_security_answers enable row level security;

-- -----------------------------------------------------------------------------
-- 11. Promouvoir un compte admin (remplacez l'email)
-- -----------------------------------------------------------------------------

-- update public.profiles
-- set role = 'admin'
-- where email = 'jesner.landa@gmail.com';
