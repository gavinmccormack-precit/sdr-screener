import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { JdDraft } from "@/lib/utils/job-description-factory";

type JdFormFieldsProps = {
  value: JdDraft;
  onChange: (patch: Partial<JdDraft>) => void;
};

export function JdFormFields({ value, onChange }: JdFormFieldsProps) {
  return (
    <>
      <FormField label="Title" htmlFor="jd-title">
        <Input
          id="jd-title"
          placeholder="e.g. Acme SDR — Remote"
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          required
        />
      </FormField>
      <FormField label="Requirements" htmlFor="jd-body">
        <Textarea
          id="jd-body"
          rows={7}
          placeholder="Paste the full job description or a list of requirements"
          value={value.body}
          onChange={(e) => onChange({ body: e.target.value })}
          required
        />
        <p className="text-xs text-stone">{value.body.length} characters</p>
      </FormField>
    </>
  );
}
