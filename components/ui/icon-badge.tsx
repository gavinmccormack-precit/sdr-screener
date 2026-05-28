import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type IconBadgeProps = {
  icon: LucideIcon;
  className?: string;
};

export function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dried-grass/40",
        className
      )}
    >
      <Icon className="h-6 w-6 text-terracotta" />
    </div>
  );
}
