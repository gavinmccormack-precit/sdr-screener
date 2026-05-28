"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useJobDescriptions } from "@/providers/job-descriptions-provider";
import { useAsyncAction } from "@/hooks/use-async-action";
import {
  createJobDescription,
  isJdDraftValid,
  type JdDraft,
} from "@/lib/utils/job-description-factory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JdFormFields } from "@/components/job-descriptions/jd-form-fields";
import { LoadingButton } from "@/components/ui/loading-button";

const EMPTY_DRAFT: JdDraft = { title: "", body: "" };

export function AddJdDialog() {
  const { add } = useJobDescriptions();
  const { loading, run } = useAsyncAction();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<JdDraft>(EMPTY_DRAFT);

  const canSave = isJdDraftValid(draft);

  function reset() {
    setDraft(EMPTY_DRAFT);
  }

  function close() {
    setOpen(false);
    reset();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;
    await run(async () => {
      // TODO: POST /api/job-descriptions
      add(createJobDescription(draft));
      close();
    }, 400);
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="h-4 w-4" />
          Add JD
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Add job description</DialogTitle>
            <DialogDescription>
              Save a role or requirements list to use when screening candidates.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <JdFormFields
              value={draft}
              onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={loading} onClick={close}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={loading}
              loadingText="Saving…"
              disabled={!canSave}
            >
              Save JD
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
