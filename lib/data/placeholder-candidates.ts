import type { CandidateListItem } from "@/lib/types/candidate";
import type { ScreeningReport } from "@/lib/types/screening";

export const PLACEHOLDER_CANDIDATES: CandidateListItem[] = [
  {
    id: "cand-1",
    candidateName: "Jane Doe",
    jdTitle: "B2B SaaS SDR — Remote",
    status: "complete",
    createdAt: "2026-05-27T14:30:00Z",
    overallScore: 82,
  },
  {
    id: "cand-2",
    candidateName: "Marcus Chen",
    jdTitle: "Enterprise SDR — NYC",
    status: "complete",
    createdAt: "2026-05-26T11:15:00Z",
    overallScore: 71,
  },
  {
    id: "cand-3",
    candidateName: "Priya Patel",
    jdTitle: "SDR — Cybersecurity",
    status: "processing",
    createdAt: "2026-05-28T09:05:00Z",
  },
  {
    id: "cand-4",
    candidateName: "Alex Rivera",
    jdTitle: "Inbound SDR — Growth team",
    status: "complete",
    createdAt: "2026-05-25T16:45:00Z",
    overallScore: 58,
  },
  {
    id: "cand-5",
    candidateName: "Sam Okonkwo",
    jdTitle: "Senior SDR — Team lead track",
    status: "failed",
    createdAt: "2026-05-24T10:20:00Z",
  },
  {
    id: "cand-6",
    candidateName: "Taylor Brooks",
    jdTitle: "B2B SaaS SDR — Remote",
    status: "processing",
    createdAt: "2026-05-28T08:12:00Z",
  },
];

export const PLACEHOLDER_SCREENINGS: Record<string, ScreeningReport> = {
  "cand-1": {
    candidateId: "cand-1",
    overallScore: 82,
    summary:
      "Strong outbound SDR profile with clear quota history and polished video delivery. Written outreach samples on the resume are concise and persona-aware. Good fit for a mid-market SaaS SDR role with room to grow on enterprise multi-threading.",
    strengths: [
      {
        dimension: "written_communication",
        score: 9,
        evidence: "Resume bullets quantify pipeline created; sample email is tight and value-led.",
      },
      {
        dimension: "verbal_delivery",
        score: 8,
        evidence: "Video: confident pace, minimal filler words, clear structure in the 90s intro.",
      },
      {
        dimension: "grit_track_record",
        score: 8,
        evidence: "Exceeded quota 4 consecutive quarters; promoted from BDR in 14 months.",
      },
    ],
    weaknesses: [
      {
        dimension: "objection_handling",
        score: 6,
        evidence: "When asked about pricing pushback, answer stayed generic without reframing to value.",
      },
      {
        dimension: "domain_fit",
        score: 7,
        evidence: "Most experience is SMB; JD emphasizes enterprise research depth.",
      },
    ],
    redFlags: [],
    transcript:
      "Hi, I'm Jane — I'm excited about this SDR role because I love building pipeline through thoughtful outbound...",
  },
  "cand-2": {
    candidateId: "cand-2",
    overallScore: 71,
    summary:
      "Solid enterprise prospecting instincts and credible tenure. Communication is professional though video energy is moderate. Worth a hiring manager review for NYC enterprise seat.",
    strengths: [
      {
        dimension: "prospecting_research",
        score: 8,
        evidence: "Resume highlights account mapping and executive touch patterns.",
      },
      {
        dimension: "coachability",
        score: 8,
        evidence: "References structured feedback loops with AE partners.",
      },
    ],
    weaknesses: [
      {
        dimension: "verbal_delivery",
        score: 6,
        evidence: "Monotone sections in minutes 1–2; pace slows under hypothetical objections.",
      },
      {
        dimension: "grit_track_record",
        score: 7,
        evidence: "Quota attainment at 88% last year — slightly below JD target.",
      },
    ],
    redFlags: ["Gap in employment May–Aug 2024 not explained on resume."],
  },
  "cand-4": {
    candidateId: "cand-4",
    overallScore: 58,
    summary:
      "Inbound experience is relevant but outbound hunger and depth of examples are thin. Video intro lacks specificity on product and ICP. Borderline for growth-team inbound; likely pass for outbound-heavy JD.",
    strengths: [
      {
        dimension: "coachability",
        score: 7,
        evidence: "Mentions weekly call reviews and script iteration.",
      },
    ],
    weaknesses: [
      {
        dimension: "prospecting_research",
        score: 5,
        evidence: "Limited evidence of self-sourced pipeline; mostly assigned leads.",
      },
      {
        dimension: "written_communication",
        score: 5,
        evidence: "Resume bullets are task-focused, not outcome-focused.",
      },
      {
        dimension: "verbal_delivery",
        score: 6,
        evidence: "Frequent filler words; closing call-to-action was unclear.",
      },
    ],
    redFlags: [
      "No video answer to the assigned objection-handling prompt.",
    ],
  },
};

export function getPlaceholderCandidate(id: string) {
  return PLACEHOLDER_CANDIDATES.find((c) => c.id === id);
}

export function getPlaceholderScreening(candidateId: string) {
  return PLACEHOLDER_SCREENINGS[candidateId];
}
