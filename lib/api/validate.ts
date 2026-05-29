import { z } from "zod";
import { badRequest } from "@/lib/api/respond";

export async function parseBody<T extends z.ZodType>(
  schema: T,
  request: Request
): Promise<z.infer<T> | Response> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    const message = result.error.issues.map((i) => i.message).join("; ");
    return badRequest(message);
  }

  return result.data;
}
