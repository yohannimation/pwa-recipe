import { RecipeCard } from '@/components/custom/recipes/recipe-card'

import type { RecipeProps } from '@/components/custom/recipes/recipe-card'

function RecipeList({ recipes }: { recipes: RecipeProps[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe, index) => {
        return <RecipeCard key={index} recipe={recipe} />
      })}
    </div>
  )
}

export { RecipeList }
