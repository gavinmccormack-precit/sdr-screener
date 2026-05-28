import Link from "next/link";
import { DashboardPage } from "@/components/layout/dashboard-page";
import { EmptyState } from "@/components/layout/empty-state";
import { CandidatesList } from "@/components/candidates/candidates-list";
import { Button } from "@/components/ui/button";
import { PLACEHOLDER_CANDIDATES } from "@/lib/data/placeholder-candidates";

export default function CandidatesPage() {
  const candidates = PLACEHOLDER_CANDIDATES;

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
