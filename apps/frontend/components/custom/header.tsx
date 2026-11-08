'use client'

import { ChefHat, Plus } from 'lucide-react'
import Image from 'next/image'

import { SearchField } from '@/components/custom/fields/search-field'
import { Button } from '../ui/button'

function Header() {
  return (
    <header className="z-10 flex h-30 max-w-[1920px] flex-col items-center gap-5 text-white md:h-15 md:flex-row">
      {/* App logo */}
      <div className="relative aspect-[2.69/1] h-full">
        <Image
          src={'/on-mange-quoooi-logo.svg'}
          fill
          alt="Logo de 'On mange quoi ?'"
        />
      </div>

      <div className="flex w-full items-center gap-5">
        {/* Search bar */}
        <div className="w-full">
          <SearchField />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant={'icon'} size={'icon'}>
            <ChefHat />
          </Button>
          <Button variant={'icon'} size={'icon'}>
            <Plus />
          </Button>
        </div>
      </div>
    </header>
  )
}

export { Header }
