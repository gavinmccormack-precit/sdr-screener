"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { useUpload } from "@/hooks/use-upload";
import {
  EMPTY_UPLOAD_FORM,
  canSubmitUpload,
  type UploadFormState,
} from "@/lib/types/upload-form";
import { ScreeningStarted } from "@/components/upload/screening-started";
import {
  JdSection,
  CandidateSection,
  ResumeSection,
  VideoSection,
} from "@/components/upload/upload-form-sections";

export function UploadForm() {
  const router = useRouter();
  const [form, setForm] = useState<UploadFormState>(EMPTY_UPLOAD_FORM);
  const [submitted, setSubmitted] = useState(false);
  const { submit, loading, loadingText, error, reset: resetUpload } = useUpload();

  const canSubmit = canSubmitUpload(form);

  function patch(partial: Partial<UploadFormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function reset() {
    resetUpload();
    setSubmitted(false);
    setForm(EMPTY_UPLOAD_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;

    try {
      await submit(form);
      router.push("/candidates");
    } catch {
      // Error message shown via useUpload().error
    }
  }

  if (submitted) {
    return (
      <ScreeningStarted
        candidateName={form.candidateName}
        jdTitle={form.selectedJd?.title}
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <JdSection form={form} onPatch={patch} />
        <CandidateSection form={form} onPatch={patch} />
        <ResumeSection onPatch={patch} />
        <VideoSection onPatch={patch} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <LoadingButton
          type="submit"
          size="lg"
          disabled={!canSubmit}
          loading={loading}
          loadingText={loadingText}
        >
          Run screening
        </LoadingButton>
        {error && (
          <p className="text-sm text-terracotta-dark" role="alert">
            {error}
          </p>
        )}
        {!canSubmit && !error && (
          <p className="text-sm text-stone">
            Add candidate name, select a JD, and upload a resume and video to
            continue.
          </p>
        )}
      </div>
    </form>
  );
}
