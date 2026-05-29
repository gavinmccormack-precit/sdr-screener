import Link from "next/link";
import { DashboardPage } from "@/components/layout/dashboard-page";
import { EmptyState } from "@/components/layout/empty-state";
import { CandidatesList } from "@/components/candidates/candidates-list";
import { CandidatesAutoRefresh } from "@/components/candidates/auto-refresh";
import { Button } from "@/components/ui/button";
import { listCandidatesWithScores } from "@/lib/db/candidates";

export const dynamic = "force-dynamic";

export default async function CandidatesPage() {
  const candidates = await listCandidatesWithScores();
  const hasProcessing = candidates.some((c) => c.status === "processing");

  return (
    <DashboardPage
      title="Candidates"
      description="Screening results for uploaded resumes and videos."
      action={
        <Button asChild>
          <Link href="/upload">New screening</Link>
        </Button>
      }
    >
      <CandidatesAutoRefresh active={hasProcessing} />
      {candidates.length === 0 ? (
        <EmptyState
          title="No screenings yet"
          description="Completed reports will appear here after you run a screening."
          actionLabel="Start a screening"
          actionHref="/upload"
        />
      ) : (
        <CandidatesList candidates={candidates} />
      )}
    </DashboardPage>
  );
}
