"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JdCombobox } from "@/components/upload/jd-combobox";
import { FileDropzone } from "@/components/upload/file-dropzone";
import type { JobDescription } from "@/lib/types/job-description";

export function UploadForm() {
  const [candidateName, setCandidateName] = useState("");
  const [jdId, setJdId] = useState<string | null>(null);
  const [selectedJd, setSelectedJd] = useState<JobDescription | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    candidateName.trim().length > 0 && jdId !== null && resume !== null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // TODO: presign upload → POST /api/screen
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="border-stone/10">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Screening started</CardTitle>
          <CardDescription>
            We&apos;re analyzing {candidateName}
            {selectedJd ? ` against “${selectedJd.title}”` : ""}. Results will
            appear on the candidates page shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button asChild>
            <Link href="/candidates">View candidates</Link>
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSubmitted(false);
              setCandidateName("");
              setJdId(null);
              setSelectedJd(null);
              setResume(null);
              setVideo(null);
            }}
          >
            Screen another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-stone/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Job description</CardTitle>
            <CardDescription>
              Pick the role requirements used to grade this candidate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label>Role / JD</Label>
            <JdCombobox
              value={jdId}
              onChange={(id, jd) => {
                setJdId(id);
                setSelectedJd(jd);
              }}
            />
            <p className="text-xs text-stone">
              <Link
                href="/job-descriptions"
                className="text-terracotta underline-offset-2 hover:underline"
              >
                Manage job descriptions
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="border-stone/10">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Candidate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Jane Doe"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone/10">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Resume</CardTitle>
            <CardDescription>PDF recommended</CardDescription>
          </CardHeader>
          <CardContent>
            <FileDropzone
              label="Upload resume"
              description="PDF or common document formats"
              accept=".pdf,.doc,.docx,application/pdf"
              icon="resume"
              onFileSelect={setResume}
            />
          </CardContent>
        </Card>

        <Card className="border-stone/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Intro video</CardTitle>
            <CardDescription>
              Candidate pitch or screening recording
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileDropzone
              label="Upload video"
              description="MP4, WebM, or MOV"
              accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
              optional
              icon="video"
              onFileSelect={setVideo}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={!canSubmit || submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Starting screening…
            </>
          ) : (
            "Run screening"
          )}
        </Button>
        {!canSubmit && (
          <p className="text-sm text-stone">
            Add candidate name, select a JD, and upload a resume to continue.
          </p>
        )}
      </div>
    </form>
  );
}
