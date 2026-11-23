import { RecipeCardLoading } from '@/components/custom/recipes/recipe-card-loading'

function RecipeListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {
        Array.from({ length: 6 }).map((_, index) => (
          <RecipeCardLoading key={index} />
        ))
      }
    </div>
  )
}

export { RecipeListSkeleton }
