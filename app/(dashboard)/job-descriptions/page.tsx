"use client";

import { DashboardPage } from "@/components/layout/dashboard-page";
import { BackLink } from "@/components/layout/back-link";
import { AddJdDialog } from "@/components/job-descriptions/add-jd-dialog";
import { JobDescriptionsList } from "@/components/job-descriptions/job-descriptions-list";
import { useJobDescriptions } from "@/providers/job-descriptions-provider";

export default function JobDescriptionsPage() {
  const { jobDescriptions, remove } = useJobDescriptions();

  return (
    <DashboardPage
      title="Job descriptions"
      description="Saved roles used when grading candidates."
      action={<AddJdDialog />}
      footer={<BackLink href="/upload">Back to upload</BackLink>}
    >
      <JobDescriptionsList items={jobDescriptions} onDelete={remove} />
    </DashboardPage>
  );
}
