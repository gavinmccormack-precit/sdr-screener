import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        clay: "text-clay hover:bg-sand hover:text-terracotta",
        ghost: "text-stone hover:bg-sand hover:text-charcoal",
      },
    },
    defaultVariants: { variant: "clay" },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, label, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(iconButtonVariants({ variant, className }))}
      {...props}
    >
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";
