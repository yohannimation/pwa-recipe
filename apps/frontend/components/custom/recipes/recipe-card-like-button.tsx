'use client'

import { Heart } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { useAuth } from '@/providers/auth-provider'
import { useRedirectToLogin } from '@/lib/usePathname'

function RecipeCardLikeButton() {
  const { user, isLoading } = useAuth()
  const redirectToLogin = useRedirectToLogin()

  const triggerLike = () => {
    if (user) {
      // Call API to like or unlike the recipe
    } else {
      toast.error('Vous devez-être connecté pour aimer du contenu', {
        action: {
          label: 'Se connecter',
          onClick: () => redirectToLogin(),
        },
        duration: 6000,
      })
    }
  }

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className={`${isLoading ? 'opacity-0' : 'opacity-100'} absolute top-4 right-4 z-1 transition-opacity`}
      onClick={triggerLike}
    >
      <Heart className={`${!user ? 'fill-white' : 'fill-foreground'}`} />
    </Button>
  )
}

export { RecipeCardLikeButton }
