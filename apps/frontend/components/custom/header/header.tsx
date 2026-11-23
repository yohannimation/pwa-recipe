'use client'

import Image from 'next/image'
import Link from 'next/link'

import { SearchField } from '@/components/custom/fields/search-field'
import { HeaderCta } from '@/components/custom/header/header-cta'

function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-35 flex-col items-center gap-5 bg-primary py-4 text-white md:h-30 md:flex-row md:py-8">
      {/* App logo */}
      <Link href={'/'} className="relative aspect-[2.69/1] h-full">
        <Image src={'/on-mange-quoooi-logo.svg'} fill alt="Logo de 'On mange quoi ?'" />
      </Link>

      <div className="flex w-full items-center gap-5">
        {/* Search bar */}
        <div className="w-full">
          <SearchField />
        </div>

        {/* Actions */}
        <HeaderCta />
      </div>
    </header>
  )
}

export { Header }
