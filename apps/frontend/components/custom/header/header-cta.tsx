'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'

import { HeaderCtaProfile } from '@/components/custom/header/header-cta-profile'
import { Button } from '@/components/ui/button'

function HeaderCta() {
  return (
    <div className="flex gap-4">
      <HeaderCtaProfile />
      <Button variant={'icon'} size={'icon'} asChild>
        <Link href={'/chief/recipes/add'}>
          <Plus />
        </Link>
      </Button>
    </div>
  )
}

export { HeaderCta }
