import { randomUUID } from "crypto";
import { createWriteStream } from "fs";
import { readFile, rm, stat } from "fs/promises";
import { tmpdir } from "os";
import { extname, join } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { extractAudio } from "@/lib/media/extract-audio";
import { buildAudioPath, uploadAudio } from "@/lib/supabase/storage";
import { badRequest, ok, serverError } from "@/lib/api/respond";

export const runtime = "nodejs";
export const maxDuration = 300;

function inputExtension(request: Request) {
  const rawName = request.headers.get("x-file-name");
  if (rawName) {
    const ext = extname(decodeURIComponent(rawName));
    if (ext) return ext;
  }
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("quicktime")) return ".mov";
  if (type.includes("webm")) return ".webm";
  if (type.includes("mp4")) return ".mp4";
  return ".mp4";
}

export async function POST(request: Request) {
  const uploadId = request.headers.get("x-upload-id");
  if (!uploadId) {
    return badRequest("Missing x-upload-id header");
  }
  if (!request.body) {
    return badRequest("Missing request body");
  }

  const scratch = randomUUID();
  const inputPath = join(
    tmpdir(),
    `screener-${scratch}-input${inputExtension(request)}`
  );
  const outputPath = join(tmpdir(), `screener-${scratch}-audio.mp3`);

  try {
    await pipeline(
      Readable.fromWeb(request.body as Parameters<typeof Readable.fromWeb>[0]),
      createWriteStream(inputPath)
    );

    const { size } = await stat(inputPath);
    console.log(`/api/upload/audio received ${size} bytes -> ${inputPath}`);
    if (size === 0) {
      return badRequest("Uploaded video was empty");
    }

    await extractAudio(inputPath, outputPath);

    const audioBuffer = await readFile(outputPath);
    const audioPath = buildAudioPath(uploadId);
    await uploadAudio(audioPath, audioBuffer);

    return ok({ audioPath }, 201);
  } catch (error) {
    console.error("POST /api/upload/audio", error);
    return serverError("Audio extraction failed");
  } finally {
    await Promise.allSettled([
      rm(inputPath, { force: true }),
      rm(outputPath, { force: true }),
    ]);
  }
}
