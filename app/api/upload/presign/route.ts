import { createResumeUploadSession } from "@/lib/supabase/storage";
import { ok, serverError } from "@/lib/api/respond";

export async function POST() {
  try {
    const session = await createResumeUploadSession();
    return ok(session, 201);
  } catch (error) {
    console.error("POST /api/upload/presign", error);
    return serverError();
  }
}
