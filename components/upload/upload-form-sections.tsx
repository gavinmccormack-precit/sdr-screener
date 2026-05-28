import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { TextLink } from "@/components/ui/text-link";
import { SectionCard } from "@/components/layout/section-card";
import { RESUME_ACCEPT, VIDEO_ACCEPT } from "@/lib/constants/uploads";
import type { UploadFormState } from "@/lib/types/upload-form";
import { JdCombobox } from "@/components/upload/jd-combobox";
import { FileDropzone } from "@/components/upload/file-dropzone";

type SectionProps = {
  form: UploadFormState;
  onPatch: (patch: Partial<UploadFormState>) => void;
};

export function JdSection({ form, onPatch }: SectionProps) {
  return (
    <SectionCard
      className="lg:col-span-2"
      title="Job description"
      description="Pick the role requirements used to grade this candidate."
    >
      <FormField label="Role / JD">
        <JdCombobox
          value={form.jdId}
          onChange={(id, jd) => onPatch({ jdId: id, selectedJd: jd })}
        />
      </FormField>
      <p className="text-xs text-stone">
        <TextLink href="/job-descriptions">Manage job descriptions</TextLink>
      </p>
    </SectionCard>
  );
}

export function CandidateSection({ form, onPatch }: SectionProps) {
  return (
    <SectionCard title="Candidate">
      <FormField label="Full name" htmlFor="name">
        <Input
          id="name"
          placeholder="Jane Doe"
          value={form.candidateName}
          onChange={(e) => onPatch({ candidateName: e.target.value })}
          required
        />
      </FormField>
    </SectionCard>
  );
}

export function ResumeSection({ onPatch }: Pick<SectionProps, "onPatch">) {
  return (
    <SectionCard title="Resume" description="PDF recommended">
      <FileDropzone
        label="Upload resume"
        description="PDF or common document formats"
        accept={RESUME_ACCEPT}
        icon="resume"
        onFileSelect={(resume) => onPatch({ resume })}
      />
    </SectionCard>
  );
}

export function VideoSection({ onPatch }: Pick<SectionProps, "onPatch">) {
  return (
    <SectionCard
      className="lg:col-span-2"
      title="Intro video"
      description="Candidate pitch or screening recording"
    >
      <FileDropzone
        label="Upload video"
        description="MP4, WebM, or MOV"
        accept={VIDEO_ACCEPT}
        optional
        icon="video"
        onFileSelect={(video) => onPatch({ video })}
      />
    </SectionCard>
  );
}
