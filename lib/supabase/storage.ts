import { randomUUID } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export const SCREENER_UPLOADS_BUCKET = "screener-uploads";

const DOWNLOAD_URL_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export function buildResumePath(uploadId: string) {
  return `uploads/${uploadId}/resume`;
}

export function buildAudioPath(uploadId: string) {
  return `uploads/${uploadId}/audio.mp3`;
}

export async function createResumeUploadSession() {
  const uploadId = randomUUID();
  const resumePath = buildResumePath(uploadId);
  const supabase = createAdminClient();

  const { data, error } = await supabase.storage
    .from(SCREENER_UPLOADS_BUCKET)
    .createSignedUploadUrl(resumePath);

  if (error) throw error;

  return {
    uploadId,
    resumePath,
    resumeUploadUrl: data.signedUrl,
  };
}

export async function uploadAudio(
  path: string,
  body: Buffer | Uint8Array,
  contentType = "audio/mpeg"
) {
  const supabase = createAdminClient();
  const { error } = await supabase.storage
    .from(SCREENER_UPLOADS_BUCKET)
    .upload(path, body, { contentType, upsert: true });

  if (error) throw error;
  return path;
}

export async function createDownloadUrl(
  path: string,
  expiresInSeconds = DOWNLOAD_URL_TTL_SECONDS
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(SCREENER_UPLOADS_BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error) throw error;
  return data.signedUrl;
}
