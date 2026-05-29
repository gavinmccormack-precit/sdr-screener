"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { JobDescription } from "@/lib/types/job-description";
import type { JdDraft } from "@/lib/utils/job-description-factory";

type JobDescriptionsContextValue = {
  jobDescriptions: JobDescription[];
  loading: boolean;
  add: (draft: JdDraft) => Promise<JobDescription>;
  remove: (id: string) => Promise<void>;
};

const JobDescriptionsContext =
  createContext<JobDescriptionsContextValue | null>(null);

export function JobDescriptionsProvider({ children }: { children: ReactNode }) {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/job-descriptions");
        if (!res.ok) throw new Error("Failed to load job descriptions");
        const { jobDescriptions: items } = (await res.json()) as {
          jobDescriptions: JobDescription[];
        };
        if (!cancelled) setJobDescriptions(items);
      } catch {
        if (!cancelled) setJobDescriptions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const add = useCallback(async (draft: JdDraft) => {
    const res = await fetch("/api/job-descriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: draft.title, body: draft.body }),
    });
    if (!res.ok) throw new Error("Failed to create job description");
    const { jobDescription } = (await res.json()) as {
      jobDescription: JobDescription;
    };
    setJobDescriptions((prev) => [jobDescription, ...prev]);
    return jobDescription;
  }, []);

  const remove = useCallback(async (id: string) => {
    const previous = jobDescriptions;
    setJobDescriptions((prev) => prev.filter((jd) => jd.id !== id));

    const res = await fetch(`/api/job-descriptions/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setJobDescriptions(previous);
      throw new Error("Failed to delete job description");
    }
  }, [jobDescriptions]);

  const value = useMemo(
    () => ({ jobDescriptions, loading, add, remove }),
    [jobDescriptions, loading, add, remove]
  );

  return (
    <JobDescriptionsContext.Provider value={value}>
      {children}
    </JobDescriptionsContext.Provider>
  );
}

export function useJobDescriptions() {
  const ctx = useContext(JobDescriptionsContext);
  if (!ctx) {
    throw new Error(
      "useJobDescriptions must be used within JobDescriptionsProvider"
    );
  }
  return ctx;
}
