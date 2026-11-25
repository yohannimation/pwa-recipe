'use client'

import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

import { Spinner } from '@/components/ui/spinner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheck />,
        info: <Info />,
        warning: <CircleAlert />,
        error: <CircleX />,
        loading: <Spinner />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'group/toast relative flex w-full items-center gap-3 rounded-xl border-2 p-4 shadow-lg text-sm',
          default: 'bg-popover text-popover-foreground border-border',
          success: 'bg-popover text-popover-foreground border-border',
          error:
            'bg-[color-mix(in_srgb,var(--destructive)_5%,white)] text-destructive border-destructive',
          warning: 'bg-popover text-popover-foreground border-border',
          info: 'bg-popover text-popover-foreground border-border',
          loading: 'bg-popover text-popover-foreground border-border',
          icon: 'flex size-5 shrink-0 items-center justify-center',
          content: 'flex flex-1 flex-col gap-0.5',
          title: '',
          description: 'text-sm',
          actionButton:
            'cursor-pointer px-3 py-1 bg-muted text-foreground rounded-sm hover:bg-primary hover:text-white',
          cancelButton:
            'inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-muted px-3 text-xs font-medium text-muted-foreground hover:bg-muted/80',
          closeButton:
            'cursor-pointer absolute right-0 top-0 flex size-6 translate-x-1/2 -translate-y-1/3 items-center justify-center rounded-full border bg-white border text-foreground hover:bg-muted',
          loader: '',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
