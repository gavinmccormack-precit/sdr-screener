export type JobDescription = {
  id: string;
  title: string;
  body: string;
};

export const PLACEHOLDER_JOB_DESCRIPTIONS: JobDescription[] = [
  {
    id: "jd-1",
    title: "B2B SaaS SDR — Remote",
    body:
      "2+ years outbound SDR experience. HubSpot/Salesforce. Quota attainment 90%+. Strong written outreach and discovery calls.",
  },
  {
    id: "jd-2",
    title: "Enterprise SDR — NYC",
    body:
      "Enterprise prospecting, multi-threading, executive outreach. 1–3 years closing-adjacent SDR or BDR role. Travel 25%.",
  },
  {
    id: "jd-3",
    title: "SDR — Cybersecurity",
    body:
      "Cold calling, objection handling, technical curiosity. Interest in security/IT buyers. Fast ramp, coachable, gritty.",
  },
  {
    id: "jd-4",
    title: "Inbound SDR — Growth team",
    body:
      "Qualify inbound leads, fast response times, product curiosity. CRM hygiene. Collaborate with AEs on handoffs.",
  },
  {
    id: "jd-5",
    title: "Senior SDR — Team lead track",
    body:
      "Mentor junior reps, refine sequences, experiment with messaging. 3+ years SDR. Leadership interest preferred.",
  },
];
