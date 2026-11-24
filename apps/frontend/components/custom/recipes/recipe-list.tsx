import { RecipeCard } from '@/components/custom/recipes/recipe-card'

import { serverApi } from '@/lib/api/server'

import type { RecipeFilterInterface, RecipeInterface } from '@/types/recipes'

async function RecipeList({ filters }: { filters: RecipeFilterInterface }) {
  const params = new URLSearchParams()
  params.set('sort', filters.sort)
  if (filters.name) params.set('name', filters.name)
  if (filters.categories)
    filters.categories.forEach((category: string) => params.append('categories', category))

  const recipes = (await serverApi<RecipeInterface[]>(`/recipes?${params}`)) ?? []

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
