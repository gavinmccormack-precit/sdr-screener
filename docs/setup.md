# Setup runbook (placeholder)

1. Create Supabase project → run `supabase/migrations/001_initial_schema.sql`
2. Create Storage buckets: `resumes`, `videos`
3. Deploy n8n → import `n8n/workflows/v1-webhook-supabase.workflow.json`
4. Copy `.env.local.example` → `.env.local` and fill values
5. `npm install` && `npm run dev` (after Next.js scaffold)
