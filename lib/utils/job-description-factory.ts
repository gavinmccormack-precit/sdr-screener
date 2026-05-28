import type { JobDescription } from "@/lib/types/job-description";

export type JdDraft = Pick<JobDescription, "title" | "body">;

export function createJobDescription(draft: JdDraft): JobDescription {
  return {
    id: crypto.randomUUID(),
    title: draft.title.trim(),
    body: draft.body.trim(),
  };
}

export function isJdDraftValid(draft: JdDraft): boolean {
  return draft.title.trim().length > 0 && draft.body.trim().length > 0;
}
