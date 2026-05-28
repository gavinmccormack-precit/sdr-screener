import { Loader2 } from "lucide-react";
import { SectionCard } from "@/components/layout/section-card";

export function ProcessingState() {
  return (
    <SectionCard title="Screening in progress">
      <div className="flex items-center gap-3 text-stone">
        <Loader2 className="h-5 w-5 animate-spin text-terracotta" />
        <p className="text-sm">
          Analyzing resume and video. This page will update when the report is
          ready.
        </p>
      </div>
    </SectionCard>
  );
}
