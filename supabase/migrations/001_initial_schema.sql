-- SDR Screener: job_descriptions, candidates, screenings
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create type candidate_status as enum ('processing', 'complete', 'failed');

create table job_descriptions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table candidates (
  id uuid primary key default gen_random_uuid(),
  job_description_id uuid references job_descriptions(id) on delete set null,
  candidate_name text not null,
  status candidate_status not null default 'processing',
  created_at timestamptz not null default now()
);

create table screenings (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null unique references candidates(id) on delete cascade,
  overall_score int check (overall_score between 0 and 100),
  summary text,
  strengths jsonb not null default '[]'::jsonb,
  weaknesses jsonb not null default '[]'::jsonb,
  transcript text,
  raw jsonb,
  created_at timestamptz not null default now()
);

create index candidates_status_idx on candidates (status);
create index candidates_created_at_idx on candidates (created_at desc);

alter table job_descriptions enable row level security;
alter table candidates enable row level security;
alter table screenings enable row level security;

create policy "anon read job_descriptions"
  on job_descriptions for select
  using (true);

create policy "anon read candidates"
  on candidates for select
  using (true);

create policy "anon read screenings"
  on screenings for select
  using (true);

alter publication supabase_realtime add table candidates;
alter publication supabase_realtime add table screenings;
