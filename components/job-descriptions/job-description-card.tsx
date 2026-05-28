import { Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import type { JobDescription } from "@/lib/types/job-description";

type JobDescriptionCardProps = {
  jd: JobDescription;
  onDelete: (id: string) => void;
};

export function JobDescriptionCard({ jd, onDelete }: JobDescriptionCardProps) {
  return (
    <Card className="border-stone/10">
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-4">
        <CardTitle className="min-w-0 flex-1 leading-snug">{jd.title}</CardTitle>
        <IconButton label={`Delete ${jd.title}`} onClick={() => onDelete(jd.id)}>
          <Trash2 className="h-5 w-5" aria-hidden />
        </IconButton>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 text-charcoal/80">
          {jd.body}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
