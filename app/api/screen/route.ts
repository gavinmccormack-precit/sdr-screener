import { badRequest } from "@/lib/api/respond";

/** @deprecated Use POST /api/candidates instead. */
export async function POST() {
  return badRequest(
    "This endpoint is deprecated. Use POST /api/candidates, then POST files to the n8n webhook."
  );
}
