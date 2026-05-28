export type StrengthWeaknessItem = {
  dimension: string;
  score: number;
  evidence: string;
};

export type ScreeningReport = {
  candidateId: string;
  overallScore: number;
  summary: string;
  strengths: StrengthWeaknessItem[];
  weaknesses: StrengthWeaknessItem[];
  redFlags: string[];
  transcript?: string;
};
