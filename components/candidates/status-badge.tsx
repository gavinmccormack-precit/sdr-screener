import { cn } from "@/lib/utils/cn";
import type { CandidateStatus } from "@/lib/types/candidate";

const styles: Record<CandidateStatus, string> = {
  processing: "bg-dried-grass/50 text-charcoal",
  complete: "bg-sage/25 text-sage-dark",
  failed: "bg-clay/15 text-clay",
};

const labels: Record<CandidateStatus, string> = {
  processing: "Processing",
  complete: "Complete",
  failed: "Failed",
};

export function StatusBadge({ status }: { status: CandidateStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
