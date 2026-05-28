"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PLACEHOLDER_JOB_DESCRIPTIONS,
  type JobDescription,
} from "@/lib/types/job-description";

type JobDescriptionsContextValue = {
  jobDescriptions: JobDescription[];
  add: (jd: JobDescription) => void;
  remove: (id: string) => void;
};

const JobDescriptionsContext =
  createContext<JobDescriptionsContextValue | null>(null);

export function JobDescriptionsProvider({ children }: { children: ReactNode }) {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>(
    PLACEHOLDER_JOB_DESCRIPTIONS
  );

  const add = useCallback((jd: JobDescription) => {
    setJobDescriptions((prev) => [jd, ...prev]);
  }, []);

  const remove = useCallback((id: string) => {
    setJobDescriptions((prev) => prev.filter((jd) => jd.id !== id));
  }, []);

  const value = useMemo(
    () => ({ jobDescriptions, add, remove }),
    [jobDescriptions, add, remove]
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
