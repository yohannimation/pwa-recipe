'use client'

import Image from 'next/image'
import Link from 'next/link'

import { HeaderCta } from '@/components/custom/header/header-cta'
import { SearchField } from '@/components/custom/fields/search-field'

function Header() {
  return (
    <header className="sticky top-0 py-4 md:py-8 bg-primary z-20 flex h-35 flex-col items-center gap-5 text-white md:h-30 md:flex-row">
      {/* App logo */}
      <Link href={'/'} className="relative aspect-[2.69/1] h-full">
        <Image
          src={'/on-mange-quoooi-logo.svg'}
          fill
          alt="Logo de 'On mange quoi ?'"
        />
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
