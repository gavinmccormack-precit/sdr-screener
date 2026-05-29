import {
  createJobDescription,
  listJobDescriptions,
} from "@/lib/db/job-descriptions";
import { createJobDescriptionSchema } from "@/lib/api/schemas";
import { badRequest, ok, serverError } from "@/lib/api/respond";
import { parseBody } from "@/lib/api/validate";

export async function GET() {
  try {
    const items = await listJobDescriptions();
    return ok({ jobDescriptions: items });
  } catch (error) {
    console.error("GET /api/job-descriptions", error);
    return serverError();
  }
}

export async function POST(request: Request) {
  const body = await parseBody(createJobDescriptionSchema, request);
  if (body instanceof Response) return body;

  try {
    const jobDescription = await createJobDescription(body);
    return ok({ jobDescription }, 201);
  } catch (error) {
    console.error("POST /api/job-descriptions", error);
    return serverError();
  }
}
