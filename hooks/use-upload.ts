"use client";

import { useCallback, useState } from "react";
import type { UploadFormState } from "@/lib/types/upload-form";

export type UploadStage =
  | "idle"
  | "uploading"
  | "extracting"
  | "starting"
  | "queueing"
  | "done"
  | "error";

type PresignResponse = {
  uploadId: string;
  resumePath: string;
  resumeUploadUrl: string;
};

type AudioResponse = {
  audioPath: string;
};

type CreateCandidateResponse = {
  candidateId: string;
  jdText: string;
  resumeDownloadUrl: string;
  audioDownloadUrl: string;
};

async function readJsonError(response: Response, fallback: string) {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

async function putFileToSignedUrl(file: File, signedUrl: string) {
  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed (${response.status})`);
  }
}

async function markCandidateFailed(candidateId: string) {
  await fetch(`/api/candidates/${candidateId}/fail`, { method: "POST" });
}

export function useUpload() {
  const [stage, setStage] = useState<UploadStage>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (form: UploadFormState) => {
    if (!form.resume || !form.video || !form.jdId) {
      throw new Error("Resume, video, and job description are required.");
    }

    setError(null);
    setStage("uploading");

    try {
      const presignRes = await fetch("/api/upload/presign", { method: "POST" });
      if (!presignRes.ok) {
        throw new Error(await readJsonError(presignRes, "Could not start upload."));
      }

      const presign = (await presignRes.json()) as PresignResponse;

      await putFileToSignedUrl(form.resume, presign.resumeUploadUrl);

      setStage("extracting");

      const audioRes = await fetch("/api/upload/audio", {
        method: "POST",
        headers: {
          "x-upload-id": presign.uploadId,
          "x-file-name": encodeURIComponent(form.video.name),
          "Content-Type": form.video.type || "application/octet-stream",
        },
        body: form.video,
      });

      if (!audioRes.ok) {
        throw new Error(
          await readJsonError(audioRes, "Could not process the video.")
        );
      }

      const { audioPath } = (await audioRes.json()) as AudioResponse;

      setStage("starting");

      const candidateRes = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: form.candidateName.trim(),
          jobDescriptionId: form.jdId,
          resumePath: presign.resumePath,
          audioPath,
        }),
      });

      if (!candidateRes.ok) {
        throw new Error(
          await readJsonError(candidateRes, "Could not create candidate.")
        );
      }

      const candidate = (await candidateRes.json()) as CreateCandidateResponse;

      const webhookUrl = process.env.NEXT_PUBLIC_N8N_SCREEN_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error("Missing NEXT_PUBLIC_N8N_SCREEN_WEBHOOK_URL.");
      }

      setStage("queueing");

      const n8nRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: candidate.candidateId,
          jdText: candidate.jdText,
          resumeUrl: candidate.resumeDownloadUrl,
          audioUrl: candidate.audioDownloadUrl,
        }),
      });

      if (!n8nRes.ok) {
        await markCandidateFailed(candidate.candidateId);
        throw new Error(
          `Screening queue failed (${n8nRes.status}). Candidate marked as failed.`
        );
      }

      setStage("done");
      return { candidateId: candidate.candidateId };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Upload failed. Please try again.";
      setError(message);
      setStage("error");
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setStage("idle");
    setError(null);
  }, []);

  const loading = stage !== "idle" && stage !== "done" && stage !== "error";

  const loadingText =
    stage === "uploading"
      ? "Uploading resume…"
      : stage === "extracting"
        ? "Processing video…"
        : stage === "starting"
          ? "Creating candidate…"
          : "Starting screening…";

  return { submit, stage, error, reset, loading, loadingText };
}
