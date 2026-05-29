import { spawn } from "child_process";
import ffmpegPath from "ffmpeg-static";

/**
 * Extracts a compact mono MP3 audio track from a video file using ffmpeg.
 * Strips video, downmixes to mono, and caps bitrate so the result stays
 * comfortably under transcription size limits (e.g. Whisper's 25 MB cap).
 */
export function extractAudio(inputPath: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    if (!ffmpegPath) {
      reject(new Error("ffmpeg binary not found (ffmpeg-static)"));
      return;
    }

    const args = [
      "-y",
      "-i",
      inputPath,
      "-vn",
      "-ac",
      "1",
      "-ar",
      "16000",
      "-b:a",
      "64k",
      outputPath,
    ];

    const proc = spawn(ffmpegPath, args);

    let stderr = "";
    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`ffmpeg exited with code ${code}: ${stderr.slice(-500)}`)
        );
      }
    });
  });
}
