'use client'

import { ChefHat, Plus } from 'lucide-react'
import Image from 'next/image'

import { SearchField } from '@/components/custom/fields/search-field'
import { Button } from '../ui/button'

function Header() {
  return (
    <header className="sticky top-4 md:top-8 mx-4 md:mx-8 my-4 md:my-8 h-30 md:h-15 max-w-[1920px] flex flex-col md:flex-row items-center gap-5 text-white z-10">
      {/* App logo */}
      <div className='relative aspect-[2.69/1] h-full'>
        <Image
          src={'/on-mange-quoooi-logo.svg'}
          fill
          alt="Logo de 'On mange quoi ?'"
        />
      </div>

      <div className='flex items-center gap-5 w-full'>
        {/* Search bar */}
        <div className='w-full'>
          <SearchField />
        </div>

        {/* Actions */}
        <div
          className="flex gap-4"
        >
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
