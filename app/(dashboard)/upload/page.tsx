import { DashboardPage } from "@/components/layout/dashboard-page";
import { UploadForm } from "@/components/upload/upload-form";

export default function UploadPage() {
  return (
    <DashboardPage
      title="New screening"
      description="Upload a resume and optional video, choose a job description, and get an AI grade."
    >
      <UploadForm />
    </DashboardPage>
  );
}
