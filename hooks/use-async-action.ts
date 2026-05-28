"use client";

import { useCallback, useState } from "react";
import { delay } from "@/lib/utils/async";

export function useAsyncAction() {
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (action: () => void | Promise<void>, minDelayMs = 0) => {
      setLoading(true);
      try {
        await Promise.all([Promise.resolve(action()), delay(minDelayMs)]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, run };
}
