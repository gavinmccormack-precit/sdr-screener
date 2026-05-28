import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/layout/section-card";

type ScreeningStartedProps = {
  candidateName: string;
  jdTitle?: string;
  onReset: () => void;
};

export function ScreeningStarted({
  candidateName,
  jdTitle,
  onReset,
}: ScreeningStartedProps) {
  return (
    <SectionCard
      title="Screening started"
      description={`We're analyzing ${candidateName}${
        jdTitle ? ` against “${jdTitle}”` : ""
      }. Results will appear on the candidates page shortly.`}
    >
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/candidates">View candidates</Link>
        </Button>
        <Button variant="secondary" onClick={onReset}>
          Screen another
        </Button>
      </div>
    </SectionCard>
  );
}
