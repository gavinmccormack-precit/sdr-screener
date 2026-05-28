"use client";

import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { useAsyncAction } from "@/hooks/use-async-action";
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
  const [form, setForm] = useState<UploadFormState>(EMPTY_UPLOAD_FORM);
  const [submitted, setSubmitted] = useState(false);
  const { loading, run } = useAsyncAction();

  const canSubmit = canSubmitUpload(form);

  function patch(partial: Partial<UploadFormState>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function reset() {
    setSubmitted(false);
    setForm(EMPTY_UPLOAD_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    await run(async () => {
      // TODO: presign upload → POST /api/screen
      setSubmitted(true);
    }, 1200);
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
          loadingText="Starting screening…"
        >
          Run screening
        </LoadingButton>
        {!canSubmit && (
          <p className="text-sm text-stone">
            Add candidate name, select a JD, and upload a resume to continue.
          </p>
        )}
      </div>
    </form>
  );
}
