import { SectionCard } from "@/components/layout/section-card";

type CandidateSummaryProps = {
  summary: string;
  redFlags: string[];
};

export function CandidateSummary({ summary, redFlags }: CandidateSummaryProps) {
  return (
    <SectionCard title="Summary">
      <p className="text-sm leading-relaxed text-charcoal">{summary}</p>
      {redFlags.length > 0 && (
        <div className="mt-4 rounded-xl border border-clay/30 bg-clay/5 p-4">
          <p className="text-sm font-medium text-clay">Red flags</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-charcoal">
            {redFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  );
}
