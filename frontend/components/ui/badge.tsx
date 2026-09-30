import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white [a]:hover:bg-secondary",
        outline:
          "bg-white text-foreground [a]:hover:bg-muted [a]:hover:text-foreground border-border",
        secondary:
          "bg-secondary text-white [a]:hover:bg-muted [a]:hover:text-secondary-foreground",
        ghost:
          "bg-transparent text-primary [a]:hover:bg-muted [a]:hover:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive text-white [a]:hover:bg-destructive/50 [a]:focus-visible:ring-destructive/20 [a]:dark:bg-destructive/20 [a]:dark:focus-visible:ring-destructive/40",
        link:
          "text-secondary [a]:underline [a]:underline-offset-6 [a]:hover:text-secondary-foreground [a]:hover:underline-offset-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
