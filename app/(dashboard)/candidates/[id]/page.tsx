import { notFound } from "next/navigation";
import { DashboardPage } from "@/components/layout/dashboard-page";
import { CandidateReport } from "@/components/candidates/candidate-report";
import {
  getPlaceholderCandidate,
  getPlaceholderScreening,
} from "@/lib/data/placeholder-candidates";

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = getPlaceholderCandidate(id);

  if (!candidate) {
    notFound();
  }

  const screening = getPlaceholderScreening(id);

  return (
    <DashboardPage title="Candidate report">
      <CandidateReport candidate={candidate} screening={screening} />
    </DashboardPage>
  );
}
