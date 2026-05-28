import { cn } from "@/lib/utils/cn";

type ScoreGaugeProps = {
  score: number;
  size?: "sm" | "lg";
};

export function ScoreGauge({ score, size = "lg" }: ScoreGaugeProps) {
  const isLarge = size === "lg";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-stone/15 bg-cream",
        isLarge ? "h-28 w-28" : "h-12 w-12 rounded-xl"
      )}
    >
      <span
        className={cn(
          "font-serif font-semibold text-terracotta",
          isLarge ? "text-4xl" : "text-lg"
        )}
      >
        {score}
      </span>
      {isLarge && <span className="text-xs text-stone">out of 100</span>}
    </div>
  );
}
