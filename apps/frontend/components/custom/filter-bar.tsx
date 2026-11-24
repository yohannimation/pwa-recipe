'use client'

import { useTransition } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { SelectField } from '@/components/custom/fields/select-field'
import { FilterList } from '@/components/custom/filter-list'

import type { CategoryInterface } from '@/types/categories'
import type { RecipeFilterInterface } from '@/types/recipes'

interface FilterBarProps {
  categories: CategoryInterface[]
  filters: RecipeFilterInterface
}

function FilterBar({ categories, filters }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const { sort } = filters

  const sortValuesList = [
    { value: 'creation-asc', label: 'Date de création A-Z' },
    { value: 'creation-desc', label: 'Date de création Z-A' },
    { value: 'name-asc', label: 'Alphabétique A-Z' },
    { value: 'name-desc', label: 'Alphabétique Z-A' },
  ]

  const sortTrigger = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)

    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  return (
    <aside className="relative z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-2 shadow-(--shadow)">
      <FilterList categories={categories} />

      <SelectField options={sortValuesList} defaultValue={sort} onValueChange={sortTrigger} />
    </aside>
  )
}

export { FilterBar }
