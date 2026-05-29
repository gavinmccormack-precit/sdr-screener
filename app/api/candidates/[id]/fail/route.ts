import { setCandidateStatus } from "@/lib/db/candidates";
import { ok, serverError } from "@/lib/api/respond";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    await setCandidateStatus(id, "failed");
    return ok({ candidateId: id, status: "failed" });
  } catch (error) {
    console.error("POST /api/candidates/[id]/fail", error);
    return serverError();
  }
}
