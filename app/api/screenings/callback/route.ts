import { saveScreeningResult } from "@/lib/db/screenings";
import { verifyN8nCallbackSecret } from "@/lib/api/auth";
import { screeningCallbackSchema } from "@/lib/api/schemas";
import { ok, unauthorized, serverError } from "@/lib/api/respond";
import { parseBody } from "@/lib/api/validate";

export async function POST(request: Request) {
  if (!verifyN8nCallbackSecret(request)) {
    return unauthorized("Invalid webhook secret");
  }

  const body = await parseBody(screeningCallbackSchema, request);
  if (body instanceof Response) return body;

  try {
    await saveScreeningResult({
      candidateId: body.candidateId,
      status: body.status,
      overallScore: body.overall_score,
      summary: body.summary,
      strengths: body.strengths,
      weaknesses: body.weaknesses,
      transcript: body.transcript,
      raw: body.raw,
    });

    return ok({ candidateId: body.candidateId, status: body.status });
  } catch (error) {
    console.error("POST /api/screenings/callback", error);
    return serverError();
  }
}
