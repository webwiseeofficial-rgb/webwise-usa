# WebWise website
1. Supabase: create a project, open SQL Editor and run:

create table public.leads(id bigint generated always as identity primary key,created_at timestamptz default now(),name text not null,whatsapp text not null,email text not null,business text not null,plan text,message text,page text);
alter table public.leads enable row level security;
create policy "anyone can submit" on public.leads for insert to anon with check (true);

2. In main.js, replace YOUR_SUPABASE_URL (Project Settings > API > Project URL) and YOUR_SUPABASE_ANON_KEY (anon public key).
3. Deploy on Vercel: import this folder (no build settings needed) or run `vercel` inside it.
4. Leads appear in Supabase > Table Editor > leads.
