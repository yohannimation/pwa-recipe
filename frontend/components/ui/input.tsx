import * as React from 'react'
import { cn } from 'cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'border-input placeholder:text-foreground/50 w-full min-w-0 [appearance:textfield] rounded-lg border-2 bg-transparent px-2.5 py-1.5 transition-colors outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        'aria-invalid:border-destructive focus:aria-invalid:ring-destructive/20 focus:aria-invalid:ring-3',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        'disabled:bg-muted/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'file:text-foreground file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      {...props}
    />
  )
}

export { Input }
