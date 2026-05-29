import { createCandidate } from "@/lib/db/candidates";
import { getJobDescriptionById } from "@/lib/db/job-descriptions";
import { createDownloadUrl } from "@/lib/supabase/storage";
import { createCandidateSchema } from "@/lib/api/schemas";
import { badRequest, ok, serverError } from "@/lib/api/respond";
import { parseBody } from "@/lib/api/validate";

export async function POST(request: Request) {
  const body = await parseBody(createCandidateSchema, request);
  if (body instanceof Response) return body;

  try {
    const jd = await getJobDescriptionById(body.jobDescriptionId);
    const candidateId = await createCandidate({
      candidateName: body.candidateName,
      jobDescriptionId: body.jobDescriptionId,
    });

    const [resumeDownloadUrl, audioDownloadUrl] = await Promise.all([
      createDownloadUrl(body.resumePath),
      createDownloadUrl(body.audioPath),
    ]);

    return ok(
      {
        candidateId,
        jdText: jd.body,
        resumeDownloadUrl,
        audioDownloadUrl,
      },
      201
    );
  } catch (error) {
    console.error("POST /api/candidates", error);
    const message =
      error && typeof error === "object" && "code" in error && error.code === "PGRST116"
        ? "Job description not found"
        : null;
    if (message) return badRequest(message);
    return serverError();
  }
}
