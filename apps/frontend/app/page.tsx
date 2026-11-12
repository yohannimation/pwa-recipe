import { FilterBar } from '@/components/custom/filter-bar'
import { Header } from '@/components/custom/header'
import { RecipeList } from '@/components/custom/recipes/recipe-list'

import { serverApi } from '@/lib/api/server'

import type { RecipeInterface } from '@/types/recipes'

export default async function Home() {
  const recipes = (await serverApi<RecipeInterface[]>('/recipes')) ?? []

  return (
    <div className="relative mx-5 md:mx-10 lg:mx-15">
      <div className='bg-primary after:from-primary sticky top-0 z-10 flex flex-col gap-8 pt-4 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-1 after:h-4 after:bg-gradient-to-b after:from-40% after:to-transparent after:content-[""] md:gap-12 md:pt-8 after:md:h-8'>
        <Header />
        <FilterBar />
      </div>
      <main className="px-2.5 py-4 md:px-5 md:py-8 lg:px-7.5">
        <RecipeList recipes={recipes} />
      </main>
    </div>
  )
}
