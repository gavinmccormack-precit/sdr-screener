import type { JobDescription } from "@/lib/types/job-description";

export function filterJobDescriptions(
  jds: JobDescription[],
  query: string
): JobDescription[] {
  const q = query.trim().toLowerCase();
  if (!q) return jds;
  return jds.filter(
    (jd) =>
      jd.title.toLowerCase().includes(q) ||
      jd.body.toLowerCase().includes(q)
  );
}
