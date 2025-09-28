import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none placeholder:text-muted-foreground enhanced-input flex field-sizing-content min-h-16 w-full rounded-lg px-4 py-3 text-base transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm glass-text-contrast",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };