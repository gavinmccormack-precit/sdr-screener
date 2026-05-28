import type { StrengthWeaknessItem } from "@/lib/types/screening";

type StrengthWeaknessListProps = {
  title: string;
  items: StrengthWeaknessItem[];
  variant: "strength" | "weakness";
};

export function StrengthWeaknessList({
  title,
  items,
  variant,
}: StrengthWeaknessListProps) {
  const barColor = variant === "strength" ? "bg-terracotta" : "bg-clay";

  return (
    <div className="space-y-3">
      <h3 className="font-serif text-lg text-charcoal">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.dimension}
            className="rounded-xl border border-stone/10 bg-sand/20 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium capitalize text-charcoal">
                {item.dimension.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-semibold text-terracotta">
                {item.score}/10
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream">
              <div
                className={`h-full rounded-full ${barColor}`}
                style={{ width: `${item.score * 10}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-stone">{item.evidence}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
