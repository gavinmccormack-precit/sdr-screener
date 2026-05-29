import { getN8nCallbackSecret } from "@/lib/supabase/env";

export function verifyN8nCallbackSecret(request: Request): boolean {
  const secret = request.headers.get("x-webhook-secret");
  if (!secret) return false;
  return secret === getN8nCallbackSecret();
}
