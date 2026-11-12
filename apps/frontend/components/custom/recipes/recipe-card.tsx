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

import type { RecipeInterface } from '@/types/recipes'

import { ArrowRight } from 'lucide-react'

function RecipeCard({ recipe }: { recipe: RecipeInterface }) {
  const {id, name, imageName, preparationTime, cookTime, numberPeople, categories, user } =
    recipe

  return (
    <Card className="overflow-hidden pt-0">
      <RecipeCardImage image={imageName} alt={name} />

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <RecipeCardDescription
            preparationTime={preparationTime}
            cookingTime={cookTime}
            likedBy={["Yohann", "Louise", "Test 3", "Test 4", "Test 5"]}
          />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RecipeCardContent categories={categories} />
      </CardContent>

      <CardFooter className="justify-end">
        <Cta
          text="Voir la recette"
          icon={<ArrowRight />}
          href={`/test-${id}`}
          size="md"
        />
      </CardFooter>
    </Card>
  )
}

export { RecipeCard }
