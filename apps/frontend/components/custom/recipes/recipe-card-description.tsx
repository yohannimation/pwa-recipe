import { ChefHat, CookingPot, Heart, Timer } from 'lucide-react'

import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Blobatar } from '@/components/ui/blobatar'

import type { UserInterface } from '@/types/users'

type RecipeCardDescriptionProps = {
  preparationTime: number
  cookingTime: number
  user: UserInterface
  likedBy: string[]
}

function RecipeCardDescription({
  preparationTime,
  cookingTime,
  user,
  likedBy,
}: RecipeCardDescriptionProps) {
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

  const likeCount = 3
  const likedByContent = (
    <>
      {' | '}
      <Badge variant={'ghost'} className="overflow-visible rounded-none border-none">
        <Heart />
        <AvatarGroup>
          {/* Display X Blobatar */}
          {likedBy.slice(0, likeCount).map((user) => (
            <Blobatar
              key={user}
              name={user}
              blobatar={{ background: 'circle', animate: 'always' }}
              title={`Aimé par ${user}`}
            />
          ))}

          {likedBy.length > likeCount && (
            <AvatarGroupCount>+{likedBy.length - likeCount}</AvatarGroupCount>
          )}
        </AvatarGroup>
      </Badge>
    </>
  )

  return (
    <div className="flex flex-wrap items-center gap-2">
      {preparationTimeContent}
      {cookingTime > 0 && <>{cookingTimeContent}</>}
      {createdByContent}
      {likedBy.length > 0 && <>{likedByContent}</>}
    </div>
  )
}

export { RecipeCardDescription }
