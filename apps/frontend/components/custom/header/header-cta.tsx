'use client'

import { Button } from '@/components/ui/button'
import { HeaderCtaProfile } from '@/components/custom/header/header-cta-profile';

import { Plus } from 'lucide-react'

function HeaderCta() {
  return (
    <div className="flex gap-4">
      <HeaderCtaProfile />
      <Button variant={'icon'} size={'icon'}>
        <Plus />
      </Button>
    </div>
  )
}

export { HeaderCta }
