import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border-2 border-input bg-transparent px-2.5 py-2 transition-colors outline-none placeholder:text-muted-foreground/50",
        "aria-invalid:border-destructive focus:aria-invalid:ring-3 focus:aria-invalid:ring-destructive/20",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
