import type { JobDescription } from "@/lib/types/job-description";

export type UploadFormState = {
  candidateName: string;
  jdId: string | null;
  selectedJd: JobDescription | null;
  resume: File | null;
  video: File | null;
};

export const EMPTY_UPLOAD_FORM: UploadFormState = {
  candidateName: "",
  jdId: null,
  selectedJd: null,
  resume: null,
  video: null,
};

export function canSubmitUpload(form: UploadFormState): boolean {
  return (
    form.candidateName.trim().length > 0 &&
    form.jdId !== null &&
    form.resume !== null &&
    form.video !== null
  );
}
