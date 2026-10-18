'use client'

import { motion } from "framer-motion"
import { ArrowDown, ChefHat, Plus } from "lucide-react"
import Image from "next/image"

import { SearchField } from "@/components/custom/fields/search-field"
import { Button } from "../ui/button"
import { useHeader } from "@/lib/useHeader"

type HeaderProps = {
  scrollable?: boolean
}

function Header({ scrollable = false }: HeaderProps) {
  const {
    scrolled,
    headerStyle,
    containerStyle,
    logoStyle,
    taglineStyle,
    searchStyle,
    actionsStyle,
    ctaStyle
  } = useHeader(scrollable)

  return (
    <>
      {/* Spacer */}
      <div className={scrolled ? "h-[6.75rem]" : "h-screen"} aria-hidden />

      <motion.header
        style={headerStyle}
        className={[
          scrollable ? "fixed top-0 inset-x-0 z-50" : "fixed w-full",
          "max-w-[1920px] mx-auto px-8 text-white flex justify-center items-center box-border",
          "[--full-w:100%] sm:[--full-w:80%] md:[--full-w:50%] lg:[--full-w:33%]",
        ].join(" ")}
      >
        <motion.div style={containerStyle} className="relative h-full">
          {/* App logo */}
          <motion.div style={logoStyle} className="absolute left-0 min-w-27 aspect-[2.69/1]">
            <Image src={"/on-mange-quoooi-logo.svg"} fill alt="Logo de 'On mange quoi ?'" />
          </motion.div>

          {!scrolled && (
            <motion.p style={taglineStyle} className="absolute inset-x-0 text-center">
              Toujours une idée dans l&apos;assiette
            </motion.p>
          )}

          {/* Search bar */}
          <motion.div style={searchStyle} className="absolute">
            <SearchField />
          </motion.div>

          {/* Actions */}
          <motion.div style={actionsStyle} className="absolute inset-x-0 flex flex-row-reverse gap-4 -z-1">
            <Button variant={"icon"} size={"icon"} className="rounded-full">
              <Plus />
            </Button>
            <Button variant={"icon"} size={"icon"} className="rounded-full">
              <ChefHat />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll CTA */}
        {!scrolled && (
          <motion.span
            style={ctaStyle}
            className="absolute bottom-10 p-1 bg-white rounded-full shadow-(--shadow) animate-bounce"
          >
            <ArrowDown size={38} className="bg-muted rounded-full p-1.5" />
          </motion.span>
        )}
      </motion.header>
    </>
  )
}

export { Header }
export type { HeaderProps }
