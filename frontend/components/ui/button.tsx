import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  cn(
    "group/button cursor-pointer inline-flex shrink-0 items-center justify-center border border-2 border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none active:not-aria-[haspopup]:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none",
  ),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-secondary",
        outline:
          "bg-white hover:bg-muted hover:text-foreground border-border aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-white hover:bg-muted hover:text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-white hover:bg-destructive/50 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link:
          "text-secondary underline underline-offset-6 hover:text-secondary-foreground hover:underline-offset-4",
      },
      size: {
        default:
          " px-4 py-1.5 gap-1.5 rounded-lg has-data-[icon=inline-start]:pl-3.5 has-data-[icon=inline-start]:gap-2 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-end]:gap-2",
        xs:
          "px-2.5 py-1.25 gap-1.5 text-xs rounded-full has-data-[icon=inline-start]:pl-1.75 has-data-[icon=inline-end]:pr-2 [&_svg:not([class*='size-'])]:size-3",
        sm:
          "px-3 py-1.25 gap-2 text-sm rounded-md has-data-[icon=inline-start]:pl-2.5 has-data-[icon=inline-end]:pr-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg:
          "px-5 py-2 gap-2.5 text-lg rounded-xl has-data-[icon=inline-start]:pl-4.5 has-data-[icon=inline-end]:pr-4.5 [&_svg:not([class*='size-'])]:size-4.5",
        icon:
          "p-2 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "p-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm":
          "p-1.75 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg":
          "p-2.5 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
