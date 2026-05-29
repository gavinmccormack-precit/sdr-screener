import type { CandidateListItem } from "@/lib/types/candidate";
import type { ScreeningReport } from "@/lib/types/screening";
import { firstRelation } from "@/lib/db/normalize";
import type {
  DbCandidateDetailRow,
  DbCandidateListRow,
  DbJobDescription,
  DbScreening,
} from "@/lib/db/types";

export function mapJobDescription(row: DbJobDescription) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
  };
}

export function mapCandidateListItem(row: DbCandidateListRow): CandidateListItem {
  const jd = firstRelation(row.job_descriptions);
  const screening = firstRelation(row.screenings);

  return {
    id: row.id,
    candidateName: row.candidate_name,
    jdTitle: jd?.title ?? "Unknown role",
    status: row.status,
    createdAt: row.created_at,
    overallScore: screening?.overall_score ?? undefined,
  };
}

export function mapScreeningReport(
  row: DbScreening,
  redFlags: string[] = []
): ScreeningReport {
  const raw = row.raw as { red_flags?: string[] } | null;
  const flags = redFlags.length > 0 ? redFlags : raw?.red_flags ?? [];

  return {
    candidateId: row.candidate_id,
    overallScore: row.overall_score ?? 0,
    summary: row.summary ?? "",
    strengths: row.strengths ?? [],
    weaknesses: row.weaknesses ?? [],
    redFlags: flags,
    transcript: row.transcript ?? undefined,
  };
}

export function mapCandidateDetail(row: DbCandidateDetailRow) {
  const screening = firstRelation(row.screenings);

  return {
    candidate: mapCandidateListItem({
      ...row,
      screenings: screening ? { overall_score: screening.overall_score } : null,
    }),
    screening: screening ? mapScreeningReport(screening) : undefined,
  };
}
