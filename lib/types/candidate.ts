export type CandidateStatus = "processing" | "complete" | "failed";

export type CandidateListItem = {
  id: string;
  candidateName: string;
  jdTitle: string;
  status: CandidateStatus;
  createdAt: string;
  overallScore?: number;
};
