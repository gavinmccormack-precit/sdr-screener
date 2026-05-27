# SDR Screener — Architecture

## For who

**Primary users:** internal recruiters (and hiring managers on the recruiting team) screening **Sales Development Representative (SDR)** candidates.

**Problem:** Today, recruiters manually review each candidate’s resume and intro video, then decide whether to advance the person, send them for further review, or decline. That listening-and-reading step is slow and repetitive.

**What this app does:** A recruiter uploads a resume and/or video, picks a saved job description, and gets back an AI-generated **score**, **summary**, **strengths**, and **weaknesses**—so they can make a go/no-go decision in minutes instead of doing a full manual review every time.

**Success looks like:** A recruiter can submit a candidate, see a clear report (score + evidence), and act on it without watching the entire video or re-reading the resume line by line.

**Context:** Precision IT / OSP built a production SDR screener for this workflow; this repo is a mock/learning implementation. Align behavior and stack with the live app when the team shares details.

## System overview

```
Recruiter (browser)
    │
    ▼
Next.js (Vercel) ──auth/storage──► Supabase (Auth, Postgres, Storage)
    │                                    │
    │ manage JDs (CRUD)                  │ job_descriptions table
    │ select JD on upload                │
    │ POST /api/screen { candidate_id, jd_id, paths }
    ▼
n8n (Railway/Fly) ──webhook workflow──► OpenAI (parse + score) + Whisper (transcribe)
    │         (receives resolved jd_text from selected job_descriptions row)
    │ write-back
    ▼
Supabase Postgres (screenings row) ──Realtime──► Next.js /candidates/[id]
```

## Repository layout

| Path | Responsibility |
|------|----------------|
| `app/` | Next.js App Router pages, layouts, API routes |
| `components/` | UI by feature area (auth, upload, candidates, job-descriptions, layout) |
| `lib/` | Supabase clients, types, constants (baked-in SDR rubric), utilities |
| `hooks/` | Client hooks (Realtime, upload, job descriptions) |
| `supabase/migrations/` | Postgres schema + RLS policies |
| `n8n/` | Importable workflows + prompt/schema assets (source of truth for AI logic) |
| `docs/` | Setup and operations runbooks |

## Data model

### `job_descriptions`

Saved JDs / requirement lists per recruiter. Recruiters paste plain text (full JD or bullet requirements); no rubric editor.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `user_id` | uuid | FK → `auth.users`, owner |
| `title` | text | Short label for dropdown (e.g. "Acme SDR — Remote") |
| `body` | text | Full pasted JD or requirements list |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**RLS:** users can `SELECT` / `INSERT` / `UPDATE` / `DELETE` only their own rows.

### `candidates`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `user_id` | uuid | Owner |
| `job_description_id` | uuid | FK → `job_descriptions` (nullable if legacy; prefer required on new uploads) |
| `candidate_name` | text | |
| `resume_path` | text | Storage key |
| `video_path` | text | Optional |
| `status` | enum | `processing` \| `complete` \| `failed` |
| `created_at` | timestamptz | |

Store `job_description_id` on the candidate so reports stay tied to the JD used at screening time (even if the JD is later edited or deleted, consider denormalizing `jd_title` + `jd_body` snapshot on `candidates` in a follow-up).

### `screenings`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `candidate_id` | uuid | FK |
| `overall_score` | int | 0–100 |
| `summary` | text | |
| `strengths` | jsonb | `[{ dimension, score, evidence }]` |
| `weaknesses` | jsonb | `[{ dimension, score, evidence }]` |
| `transcript` | text | From Whisper |
| `raw` | jsonb | Full LLM output |
| `created_at` | timestamptz | |

No orgs, no rubric tables. **Baked-in SDR rubric** in n8n; JD only supplies role-specific criteria text.

## API surface

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/job-descriptions` | GET | List current user's saved JDs (for dropdown) |
| `/api/job-descriptions` | POST | Create JD (`title`, `body`) |
| `/api/job-descriptions/[id]` | PATCH | Update title/body |
| `/api/job-descriptions/[id]` | DELETE | Delete JD (block or warn if referenced by candidates) |
| `/api/upload/presign` | POST | Issue Supabase Storage presigned URL for resume/video |
| `/api/screen` | POST | Insert candidate with `job_description_id`, resolve `body` → `jd_text`, trigger n8n |
| `/api/auth/callback` | GET | Supabase OAuth/magic-link callback |

n8n webhook payload: `{ candidate_id, resume_path, video_path?, jd_text }` — `jd_text` is the resolved `job_descriptions.body` at screen time.

## Pages

| Route | Purpose |
|-------|---------|
| `/login` | Magic-link sign-in |
| `/job-descriptions` | List saved JDs; add (paste + title), edit, delete |
| `/upload` | Candidate upload: **JD dropdown** (required unless zero JDs — then prompt to create one), resume, optional video |
| `/candidates` | List with score, status, JD title used |
| `/candidates/[id]` | Report: score, summary, strengths/weaknesses, video + transcript; show which JD was used |

## Job descriptions — product behavior

1. Recruiter opens **Job descriptions** and adds a new entry: **title** + **body** (paste full JD or bullet requirements).
2. On **Upload**, recruiter picks a saved JD from a **dropdown** (default: most recently used or first in list).
3. Recruiter can **delete** unused JDs; confirm before delete if any candidates reference that JD.
4. Scoring still uses the **baked-in SDR rubric** in n8n; the saved JD text is passed as context for `domain_fit` and role-specific evidence (same as optional paste before).

## n8n workflows

1. **mvp-form-trigger** — 2-hour validation (Form Trigger → email report). Optional; not wired to Next.js.
2. **v1-webhook-supabase** — Production path triggered by Next.js; writes to `screenings`.

Prompts and JSON schema live in `n8n/prompts/`. User prompt still receives `jd_text` (resolved server-side from `job_description_id`).

## Environment variables

See `.env.local.example`. Never commit `.env.local`.

## Build phases

1. Supabase migration: `job_descriptions` + `candidates.job_description_id` + RLS
2. JD API routes + `lib/types/job-description.ts`
3. `/job-descriptions` page + `components/job-descriptions/`
4. Upload page: JD dropdown wired to `POST /api/screen`
5. n8n workflow unchanged (still consumes `jd_text`)
6. Deploy Next.js to Vercel, n8n to Railway
