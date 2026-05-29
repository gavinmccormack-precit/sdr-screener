-- Private bucket for resume + video uploads (7-day retention via pg_cron)
-- Run in Supabase SQL Editor after 001_initial_schema.sql

insert into storage.buckets (id, name, public)
values ('screener-uploads', 'screener-uploads', false)
on conflict (id) do nothing;

create or replace function delete_old_screener_uploads()
returns void
language sql
security definer
set search_path = public, storage
as $$
  delete from storage.objects
  where bucket_id = 'screener-uploads'
    and created_at < now() - interval '7 days';
$$;

create extension if not exists pg_cron with schema extensions;

do $$
declare
  existing_job_id bigint;
begin
  select jobid into existing_job_id
  from cron.job
  where jobname = 'cleanup-screener-uploads'
  limit 1;

  if existing_job_id is not null then
    perform cron.unschedule(existing_job_id);
  end if;
end $$;

select cron.schedule(
  'cleanup-screener-uploads',
  '0 3 * * *',
  $$select delete_old_screener_uploads()$$
);
