import { Suspense } from 'react'

import { FilterBar } from '@/components/custom/filter-bar'
import { RecipeList } from '@/components/custom/recipes/recipe-list'
import { RecipeListSkeleton } from '@/components/custom/recipes/recipe-list-skeleton'

import { serverApi } from '@/lib/api/server'

import type { CategoryInterface } from '@/types/categories'
import type { SortInterface } from '@/types/sort'

interface HomeProps {
  searchParams: Promise<{ sort?: SortInterface }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { sort } = await searchParams
  const currentSort = sort ?? 'creation-asc'

  const categories = (await await serverApi<CategoryInterface[]>('/categories')) ?? []

  return (
    <>
      <div className='sticky top-35 z-10 bg-primary after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-1 after:h-4 after:bg-gradient-to-b after:from-primary after:from-40% after:to-transparent after:content-[""] md:top-30 after:md:h-8'>
        <FilterBar categories={categories} currentSort={currentSort} />
      </div>
      <div className="px-2.5 py-4 md:px-5 md:py-8 lg:px-7.5">
        <Suspense key={currentSort} fallback={<RecipeListSkeleton />}>
          <RecipeList currentSort={currentSort} />
        </Suspense>
      </div>
    </>
  )
}
