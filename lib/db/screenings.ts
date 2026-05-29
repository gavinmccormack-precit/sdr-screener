import { createAdminClient } from "@/lib/supabase/admin";
import { setCandidateStatus } from "@/lib/db/candidates";
import type { CandidateStatus } from "@/lib/types/candidate";
import type { StrengthWeaknessItem } from "@/lib/types/screening";

export type SaveScreeningInput = {
  candidateId: string;
  status: Extract<CandidateStatus, "complete" | "failed">;
  overallScore?: number;
  summary?: string;
  strengths?: StrengthWeaknessItem[];
  weaknesses?: StrengthWeaknessItem[];
  transcript?: string;
  raw?: unknown;
};

export async function saveScreeningResult(input: SaveScreeningInput) {
  const supabase = createAdminClient();

  if (input.status === "failed") {
    await setCandidateStatus(input.candidateId, "failed");
    return;
  }

  const { error: screeningError } = await supabase.from("screenings").upsert(
    {
      candidate_id: input.candidateId,
      overall_score: input.overallScore ?? null,
      summary: input.summary ?? null,
      strengths: input.strengths ?? [],
      weaknesses: input.weaknesses ?? [],
      transcript: input.transcript ?? null,
      raw: input.raw ?? null,
    },
    { onConflict: "candidate_id" }
  );

  if (screeningError) throw screeningError;

  await setCandidateStatus(input.candidateId, "complete");
}
