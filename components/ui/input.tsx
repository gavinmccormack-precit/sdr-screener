import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { fieldControlStyles } from "@/lib/utils/field-styles";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        suppressHydrationWarning
        type={type}
        className={cn(
          "flex h-11 w-full px-4 py-2 placeholder:text-stone/70 disabled:cursor-not-allowed disabled:opacity-50",
          fieldControlStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
