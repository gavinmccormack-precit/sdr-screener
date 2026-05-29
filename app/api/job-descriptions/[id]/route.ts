import { deleteJobDescription } from "@/lib/db/job-descriptions";
import { ok, serverError } from "@/lib/api/respond";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    await deleteJobDescription(id);
    return ok({ deleted: true });
  } catch (error) {
    console.error("DELETE /api/job-descriptions/[id]", error);
    return serverError();
  }
}
