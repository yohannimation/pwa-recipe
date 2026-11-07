'use client'

import { useState } from 'react'

import {
  RecipeCard,
  type RecipeProps,
} from '@/components/custom/recipes/recipe-card'
import { RecipeCardLoading } from '@/components/custom/recipes/recipe-card-loading'

function RecipeList({ recipes }: { recipes: RecipeProps[] }) {
  const [isLoaded, setIsLoaded] = useState<boolean>(true)

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoaded ? (
        recipes.length > 0 ? (
          recipes.map((recipe, index) => {
            return <RecipeCard key={index} recipe={recipe} />
          })
        ) : (
          <>Aucune recette trouvée</>
        )
      ) : (
        Array.from({ length: 6 }).map((_, index) => (
          <RecipeCardLoading key={index} />
        ))
      )}
    </div>
  )
}

export { RecipeList }
