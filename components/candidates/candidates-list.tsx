import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { StatusBadge } from "@/components/candidates/status-badge";
import { ScoreGauge } from "@/components/candidates/score-gauge";
import { formatScreeningDate } from "@/lib/utils/format-date";
import type { CandidateListItem } from "@/lib/types/candidate";

type CandidatesListProps = {
  candidates: CandidateListItem[];
};

export function CandidatesList({ candidates }: CandidatesListProps) {
  return (
    <ul className="space-y-3">
      {candidates.map((candidate) => (
        <li key={candidate.id}>
          <Link
            href={`/candidates/${candidate.id}`}
            className={cn(
              "flex items-center gap-4 rounded-2xl border border-stone/10 bg-cream p-4 shadow-sm",
              "transition-colors hover:border-terracotta/30 hover:bg-cream/80"
            )}
          >
            {candidate.status === "complete" && candidate.overallScore != null ? (
              <ScoreGauge score={candidate.overallScore} size="sm" />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sand/50 text-xs text-stone">
                —
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-charcoal">
                  {candidate.candidateName}
                </p>
                <StatusBadge status={candidate.status} />
              </div>
              <p className="mt-0.5 truncate text-sm text-stone">
                {candidate.jdTitle}
              </p>
              <p className="mt-1 text-xs text-stone/80">
                {formatScreeningDate(candidate.createdAt)}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-stone" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
