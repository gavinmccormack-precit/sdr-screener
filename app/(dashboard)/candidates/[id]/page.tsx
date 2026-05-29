import { notFound } from "next/navigation";
import { DashboardPage } from "@/components/layout/dashboard-page";
import { CandidateReport } from "@/components/candidates/candidate-report";
import { CandidatesAutoRefresh } from "@/components/candidates/auto-refresh";
import { getCandidateWithScreening } from "@/lib/db/candidates";

export const dynamic = "force-dynamic";

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCandidateWithScreening(id);

  if (!result) {
    notFound();
  }

  const { candidate, screening } = result;

  return (
    <DashboardPage title="Candidate report">
      <CandidatesAutoRefresh active={candidate.status === "processing"} />
      <CandidateReport candidate={candidate} screening={screening} />
    </DashboardPage>
  );
}
