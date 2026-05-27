import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLACEHOLDER_JOB_DESCRIPTIONS } from "@/lib/types/job-description";

export default function JobDescriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Job descriptions</h1>
          <p className="mt-1 text-stone">
            Saved roles used when grading candidates. (Placeholder data)
          </p>
        </div>
        <Button variant="secondary" disabled>
          Add JD (coming soon)
        </Button>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {PLACEHOLDER_JOB_DESCRIPTIONS.map((jd) => (
          <li key={jd.id}>
            <Card className="h-full border-stone/10">
              <CardHeader>
                <CardTitle className="text-lg">{jd.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 text-charcoal/80">
                  {jd.body}
                </CardDescription>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <Button asChild variant="outline">
        <Link href="/upload">Back to upload</Link>
      </Button>
    </div>
  );
}
