import { BackLink } from "@/components/layout/back-link";
import { SectionCard } from "@/components/layout/section-card";
import { ScoreGauge } from "@/components/candidates/score-gauge";
import { CandidateSummary } from "@/components/candidates/candidate-summary";
import { StrengthWeaknessList } from "@/components/candidates/strength-weakness-list";
import { StatusBadge } from "@/components/candidates/status-badge";
import { ProcessingState } from "@/components/candidates/processing-state";
import { formatScreeningDate } from "@/lib/utils/format-date";
import type { CandidateListItem } from "@/lib/types/candidate";
import type { ScreeningReport } from "@/lib/types/screening";

type CandidateReportProps = {
  candidate: CandidateListItem;
  screening?: ScreeningReport;
};

export function CandidateReport({ candidate, screening }: CandidateReportProps) {
  if (candidate.status === "processing") {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-2xl text-charcoal">
            {candidate.candidateName}
          </h2>
          <StatusBadge status={candidate.status} />
        </div>
        <ProcessingState />
        <BackLink href="/candidates">Back to candidates</BackLink>
      </div>
    );
  }

  if (candidate.status === "failed") {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-2xl text-charcoal">
            {candidate.candidateName}
          </h2>
          <StatusBadge status={candidate.status} />
        </div>
        <SectionCard
          title="Screening failed"
          description="Something went wrong while processing this candidate. Try uploading again or contact support."
        />
        <BackLink href="/candidates">Back to candidates</BackLink>
      </div>
    );
  }

  if (!screening) {
    return (
      <SectionCard
        title="Report unavailable"
        description="This screening is marked complete but no report data is loaded yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl text-charcoal">
              {candidate.candidateName}
            </h2>
            <StatusBadge status={candidate.status} />
          </div>
          <p className="mt-1 text-sm text-stone">{candidate.jdTitle}</p>
          <p className="text-xs text-stone/80">
            Screened {formatScreeningDate(candidate.createdAt)}
          </p>
        </div>
        <ScoreGauge score={screening.overallScore} />
      </div>

      <CandidateSummary
        summary={screening.summary}
        redFlags={screening.redFlags}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone/10 bg-cream p-6 shadow-sm">
          <StrengthWeaknessList
            title="Strengths"
            items={screening.strengths}
            variant="strength"
          />
        </div>
        <div className="rounded-2xl border border-stone/10 bg-cream p-6 shadow-sm">
          <StrengthWeaknessList
            title="Weaknesses"
            items={screening.weaknesses}
            variant="weakness"
          />
        </div>
      </div>

      {screening.transcript && (
        <SectionCard title="Video transcript">
          <p className="text-sm leading-relaxed text-charcoal/90">
            {screening.transcript}
          </p>
        </SectionCard>
      )}

      <BackLink href="/candidates">Back to candidates</BackLink>
    </div>
  );
}
