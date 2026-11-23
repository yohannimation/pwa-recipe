import { ChefHat, CookingPot, Timer } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Blobatar } from '@/components/ui/blobatar'

import type { UserInterface } from '@/types/users'

type RecipeCardDescriptionProps = {
  preparationTime: number
  cookingTime: number
  user: UserInterface
}

function RecipeCardDescription({ preparationTime, cookingTime, user }: RecipeCardDescriptionProps) {
  const preparationTimeContent = (
    <Badge variant={'ghost'} className="rounded-none border-none">
      <Timer /> {preparationTime}min
    </Badge>
  )

  const cookingTimeContent = (
    <>
      {' | '}
      <Badge variant={'ghost'} className="rounded-none border-none">
        <CookingPot /> {cookingTime}min
      </Badge>
    </>
  )

  const createdByContent = (
    <>
      {' | '}
      <Badge
        variant={'ghost'}
        className="overflow-visible rounded-none border-none"
        title={`Créée par ${user.username}`}
      >
        <ChefHat />
        <Blobatar
          key={user.id}
          name={user.username}
          blobatar={{ background: 'circle', animate: 'always' }}
        />
      </Badge>
    </>
  )

  return (
    <div className="flex flex-wrap items-center gap-2">
      {preparationTimeContent}
      {cookingTime > 0 && <>{cookingTimeContent}</>}
      {createdByContent}
    </div>
  )
}

export { RecipeCardDescription }
