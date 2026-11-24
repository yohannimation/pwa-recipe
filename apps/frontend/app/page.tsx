import { Suspense } from 'react'

import { FilterBar } from '@/components/custom/filter-bar'
import { RecipeList } from '@/components/custom/recipes/recipe-list'
import { RecipeListSkeleton } from '@/components/custom/recipes/recipe-list-skeleton'

import { serverApi } from '@/lib/api/server'
import { toArray } from '@/lib/utils'

import type { CategoryInterface } from '@/types/categories'
import type { RecipeFilterInterface } from '@/types/recipes'

interface HomeProps {
  searchParams: Promise<RecipeFilterInterface>
}

export default async function Home({ searchParams }: HomeProps) {
  const { sort, name, categories: categoriesParams } = await searchParams

  const filters: RecipeFilterInterface = {
    sort: sort ?? 'creation-asc',
    name,
    categories: toArray(categoriesParams),
  }

  const categories = (await await serverApi<CategoryInterface[]>('/categories')) ?? []

  return (
    <>
      <div className='sticky top-35 z-10 bg-primary after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-1 after:h-4 after:bg-gradient-to-b after:from-primary after:from-40% after:to-transparent after:content-[""] md:top-30 after:md:h-8'>
        <FilterBar categories={categories} filters={filters} />
      </div>
      <div className="px-2.5 py-4 md:px-5 md:py-8 lg:px-7.5">
        <Suspense key={JSON.stringify(filters)} fallback={<RecipeListSkeleton />}>
          <RecipeList filters={filters} />
        </Suspense>
      </div>
    </>
  )
}
