-- Demandes de devis depuis le formulaire public (contact#devis)
-- Exécuter dans Supabase → SQL Editor

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
