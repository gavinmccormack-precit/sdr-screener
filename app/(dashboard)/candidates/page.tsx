import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-charcoal">Candidates</h1>
      <Card className="border-stone/10">
        <CardHeader>
          <CardTitle className="font-serif text-xl">No screenings yet</CardTitle>
          <CardDescription>
            Completed reports will appear here after you run a screening.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/upload">Start a screening</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
