"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type CandidatesAutoRefreshProps = {
  active: boolean;
  intervalMs?: number;
};

export function CandidatesAutoRefresh({
  active,
  intervalMs = 4000,
}: CandidatesAutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => router.refresh(), intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs, router]);

  return null;
}
