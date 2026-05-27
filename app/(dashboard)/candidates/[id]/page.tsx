import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-charcoal">Candidate report</h1>
      <Card className="border-stone/10">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Coming soon</CardTitle>
          <CardDescription>
            Screening report for candidate {id} will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/candidates">Back to candidates</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
