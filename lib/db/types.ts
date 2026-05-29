import type { CandidateStatus } from "@/lib/types/candidate";
import type { StrengthWeaknessItem } from "@/lib/types/screening";

export type DbJobDescription = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

export type DbCandidate = {
  id: string;
  job_description_id: string | null;
  candidate_name: string;
  status: CandidateStatus;
  created_at: string;
};

export type DbScreening = {
  id: string;
  candidate_id: string;
  overall_score: number | null;
  summary: string | null;
  strengths: StrengthWeaknessItem[];
  weaknesses: StrengthWeaknessItem[];
  transcript: string | null;
  raw: unknown;
  created_at: string;
};

type MaybeArray<T> = T | T[] | null;

export type DbCandidateListRow = DbCandidate & {
  job_descriptions: MaybeArray<{ title: string }>;
  screenings: MaybeArray<{ overall_score: number | null }>;
};

export type DbCandidateDetailRow = DbCandidate & {
  job_descriptions: MaybeArray<{ title: string; body: string }>;
  screenings: MaybeArray<DbScreening>;
};
