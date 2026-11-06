import { CookingPot, Timer } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Blobatar } from '@/components/ui/blobatar'

type RecipeCardDescriptionProps = {
  preparationTime: number
  cookingTime: number
  likedBy: string[]
}

function RecipeCardDescription({ preparationTime, cookingTime, likedBy }: RecipeCardDescriptionProps ) {
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

  const likedByContent = (
    <>
      {' | '}
      <AvatarGroup>
        {/* Display 3 Blobatar */}
        {likedBy.slice(0, 3).map((user) => (
          <Blobatar
            key={user}
            name={user}
            blobatar={{ background: 'circle', animate: 'always' }}
            title={`Aimé par ${user}`}
          />
        ))}

        {likedBy.length > 3 && (
          <AvatarGroupCount>+{likedBy.length - 3}</AvatarGroupCount>
        )}
      </AvatarGroup>
    </>
  )

  return (
    <div className="flex h-8 items-center gap-2">
      {preparationTimeContent}
      {cookingTime > 0 && <>{cookingTimeContent}</>}
      {likedBy.length > 0 && <>{likedByContent}</>}
    </div>
  )
}

export { RecipeCardDescription }
