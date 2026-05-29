import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { mapCandidateDetail, mapCandidateListItem } from "@/lib/db/mappers";
import type { CandidateStatus } from "@/lib/types/candidate";
import type { DbCandidateDetailRow, DbCandidateListRow } from "@/lib/db/types";

const listSelect = `
  id,
  job_description_id,
  candidate_name,
  status,
  created_at,
  job_descriptions ( title ),
  screenings ( overall_score )
`;

const detailSelect = `
  id,
  job_description_id,
  candidate_name,
  status,
  created_at,
  job_descriptions ( title, body ),
  screenings (
    id,
    candidate_id,
    overall_score,
    summary,
    strengths,
    weaknesses,
    transcript,
    raw,
    created_at
  )
`;

export async function listCandidatesWithScores() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("candidates")
    .select(listSelect)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as DbCandidateListRow[]).map(mapCandidateListItem);
}

export async function getCandidateWithScreening(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("candidates")
    .select(detailSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapCandidateDetail(data as DbCandidateDetailRow);
}

export async function createCandidate(input: {
  candidateName: string;
  jobDescriptionId: string;
}) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("candidates")
    .insert({
      candidate_name: input.candidateName.trim(),
      job_description_id: input.jobDescriptionId,
      status: "processing" satisfies CandidateStatus,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function setCandidateStatus(id: string, status: CandidateStatus) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("candidates")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}
