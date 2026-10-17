'use client'

import Image from "next/image"

import { SearchField } from "@/components/custom/fields/search-field"
import { ArrowDown, ChefHat, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

type HeaderProps = {
  scrollable?: boolean
}

function Header({ scrollable = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(!scrollable)

  if (!scrollable) {
    return (
      <header className="relative text-white flex-1 flex flex-col justify-center items-center px-8 my-8">
        <div className="relative flex items-center gap-4 w-full">
          <div className="mb-0">
            {/* App logo */}
            <div className="relative w-35 aspect-[2.69/1]">
              <Image src={"/on-mange-quoooi-logo.svg"} fill alt="" />
            </div>
  
            <p className="mt-0 text-center hidden opacity-0">Toujours une idée dans l'assiette</p>
          </div>
  
          {/* Search bar */}
          <div className="relative flex gap-4 w-full">
            <SearchField />

            <div className="flex gap-4">
              <Button variant={"icon"} size={"icon"} className="rounded-full">
                <Plus />
              </Button>
              <Button variant={"icon"} size={"icon"} className="rounded-full">
                <ChefHat />
              </Button>
            </div>
          </div>
        </div>
  
        {/* Scroll CTA */}
        <span className="hidden opacity-0 absolute bottom-10 p-1 bg-white rounded-full shadow-(--shadow) animate-bounce">
          <ArrowDown size={38} className="bg-muted rounded-full p-1.5" />
        </span>
      </header>
    )
  }

  return (
    <header className="relative text-white flex-1 flex flex-col justify-center items-center px-8 my-0 min-h-screen">
      <div className="relative mx-8 w-full sm:w-[50vw] w-[33vw] max-w-[640px]">
        <div className="mb-25">
          {/* App logo */}
          <div className="relative w-full aspect-[2.69/1]">
            <Image src={"/on-mange-quoooi-logo.svg"} fill alt="" />
          </div>

          <p className="mt-10 text-center">Toujours une idée dans l'assiette</p>
        </div>

        {/* Search bar */}
        <div className="relative flex gap-4">
          <SearchField />

          <div className="absolute right-0 flex gap-4">
            <Button variant={"icon"} size={"icon"} className="rounded-full">
              <Plus />
            </Button>
            <Button variant={"icon"} size={"icon"} className="rounded-full">
              <ChefHat />
            </Button>
          </div>
        </div>

      </div>

      {/* Scroll CTA */}
      <span className="absolute bottom-10 p-1 bg-white rounded-full shadow-(--shadow) animate-bounce">
        <ArrowDown size={38} className="bg-muted rounded-full p-1.5" />
      </span>
    </header>
  )
}

export { Header }
export type { HeaderProps }
