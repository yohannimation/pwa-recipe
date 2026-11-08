'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'

type CtaProps = {
  text: string
  icon: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  onClick?: () => void
}

function Cta({ text, icon, size = 'md', href, target, onClick }: CtaProps) {
  const sizeStyles = {
    sm: {
      container: 'pl-2 pr-1.75 py-1',
      background: 'w-7 rounded-sm',
      iconMargin: 'ml-2 group-hover:ml-0',
      buttonSize: 'sm' as VariantProps<typeof buttonVariants>['size'],
    },
    md: {
      container: 'pl-2.5 pr-2.5 py-2',
      background: 'w-9 rounded-md',
      iconMargin: 'ml-5 group-hover:ml-2',
      buttonSize: 'md' as VariantProps<typeof buttonVariants>['size'],
    },
    lg: {
      container: 'pl-5 pr-3.75 py-2',
      background: 'w-11.5 rounded-xl',
      iconMargin: 'ml-4 group-hover:ml-2',
      buttonSize: 'lg' as VariantProps<typeof buttonVariants>['size'],
    },
  }

  const { container, background, iconMargin, buttonSize } = sizeStyles[size]
  const className = `group relative h-auto rounded-none border-none bg-transparent hover:bg-transparent ${container}`

  const content = (
    <>
      {/* Background */}
      <span
        aria-hidden
        className={`bg-primary group-hover:bg-secondary absolute inset-y-0 right-0 ${background} duration-300 ease-out group-hover:w-full`}
      />

      <span className="text-foreground relative transition-colors duration-150 group-hover:text-white">
        {text}
      </span>
      <span
        className={`relative z-1 text-white transition-[margin] duration-200 ${iconMargin}`}
      >
        {icon}
      </span>
    </>
  )

  const buttonProps = {
    variant: 'ghost' as const,
    size: buttonSize,
    className,
    title: text,
  }

  if (href) {
    return (
      <Button {...buttonProps} asChild>
        <Link href={href} target={target}>
          {content}
        </Link>
      </Button>
    )
  }

  return (
    <Button {...buttonProps} type="button" onClick={onClick}>
      {content}
    </Button>
  )
}

export { Cta }
export type { CtaProps }
