import { RecipeCard } from '@/components/custom/recipes/recipe-card'

import { serverApi } from '@/lib/api/server'

import type { RecipeInterface } from '@/types/recipes'
import type { SortInterface } from '@/types/sort'

async function RecipeList({ currentSort }: { currentSort: SortInterface }) {
  const recipes = (await serverApi<RecipeInterface[]>(`/recipes?sort=${currentSort}`)) ?? []

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => {
          return <RecipeCard key={index} recipe={recipe} />
        })
      ) : (
        <>Aucune recette trouvée</>
      )}
    </div>
  )
}

export { RecipeList }
