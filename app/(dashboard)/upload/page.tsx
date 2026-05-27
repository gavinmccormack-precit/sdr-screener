import { UploadForm } from "@/components/upload/upload-form";

export default function UploadPage() {
  return (
    <div className="space-y-2">
      <h1 className="font-serif text-3xl text-charcoal">New screening</h1>
      <p className="text-stone">
        Upload a resume and optional video, choose a job description, and get an
        AI grade.
      </p>
      <div className="pt-6">
        <UploadForm />
      </div>
    </div>
  );
}
