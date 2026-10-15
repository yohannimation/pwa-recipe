"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

type CtaProps = {
  text: string
  icon: React.ReactNode
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  onClick?: () => void
}

function Cta({
  text,
  icon,
  href,
  target,
  onClick
}: CtaProps) {
  const className =
    "group relative h-auto rounded-none border-none bg-transparent pl-5 pr-3.75 py-2 hover:bg-transparent"

  const content = (
    <>
      {/* Background */}
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 w-11.5 group-hover:w-full bg-primary group-hover:bg-secondary rounded-xl duration-300 ease-out"
      />

      <span className="relative text-foreground group-hover:text-white transition-colors duration-150">
        { text }
      </span>
      <span className="relative ml-4 group-hover:ml-2 text-white z-1 transition-[margin] duration-200">
        { icon }
      </span>
    </>
  )

  // `href` version
  if (href) {
    return (
      <Button variant="ghost" size="lg" className={className} asChild>
        <Link href={href} target={target} title={text}>{content}</Link>
      </Button>
    )
  }

  // `onClick` version
  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      className={className}
      onClick={onClick}
      title={text}
    >
      {content}
    </Button>
  )
}

export { Cta }
export type { CtaProps }
