import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Cta } from '@/components/custom/cta'

import { RecipeCardContent } from '@/components/custom/recipes/recipe-card-content'
import { RecipeCardDescription } from '@/components/custom/recipes/recipe-card-description'
import { RecipeCardImage } from '@/components/custom/recipes/recipe-card-img'

import { ArrowRight } from 'lucide-react'

type RecipeProps = {
  id: number
  name: string
  image: string
  preparationTime: number
  cookingTime: number
  likedBy: string[]
  tags: string[]
  url: string
}

function RecipeCard({ recipe }: { recipe: RecipeProps }) {
  const { id, name, image, preparationTime, cookingTime, likedBy, tags, url } =
    recipe

  return (
    <Card className="overflow-hidden pt-0">
      <RecipeCardImage image={image} alt={name} />

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <RecipeCardDescription
            preparationTime={preparationTime}
            cookingTime={cookingTime}
            likedBy={likedBy}
          />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RecipeCardContent tags={tags} />
      </CardContent>

      <CardFooter className="justify-end">
        <Cta
          text="Voir la recette"
          icon={<ArrowRight />}
          href={url}
          size="md"
        />
      </CardFooter>
    </Card>
  )
}

export { RecipeCard }
export type { RecipeProps }
