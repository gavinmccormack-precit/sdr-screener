import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { fieldControlStyles } from "@/lib/utils/field-styles";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      suppressHydrationWarning
      className={cn(
        "flex min-h-[140px] w-full resize-y px-4 py-3 placeholder:text-stone/70 disabled:cursor-not-allowed disabled:opacity-50",
        fieldControlStyles,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
