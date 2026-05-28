import { SectionCard } from "@/components/layout/section-card";
import { AddJdDialog } from "@/components/job-descriptions/add-jd-dialog";
import { JobDescriptionCard } from "@/components/job-descriptions/job-description-card";
import type { JobDescription } from "@/lib/types/job-description";

type JobDescriptionsListProps = {
  items: JobDescription[];
  onDelete: (id: string) => void;
};

export function JobDescriptionsList({ items, onDelete }: JobDescriptionsListProps) {
  if (items.length === 0) {
    return (
      <SectionCard
        title="No job descriptions yet"
        description="Add one to use it on the upload page when screening candidates."
      >
        <AddJdDialog />
      </SectionCard>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((jd) => (
        <li key={jd.id}>
          <JobDescriptionCard jd={jd} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
