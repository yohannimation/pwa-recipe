'use client'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useAuth } from '@/providers/auth-provider'

function RecipeCardLikeButton() {
  const { user, isLoading } = useAuth()

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      disabled={!user}
      className={`${isLoading ? 'opacity-0' : 'opacity-100'} absolute top-4 right-4 z-1 transition-opacity`}
    >
      <Heart className={`${!user ? 'fill-white' : 'fill-foreground'}`} />
    </Button>
  )
}

export { RecipeCardLikeButton }
