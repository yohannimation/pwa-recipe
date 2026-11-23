'use client'

import { useTransition } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { SelectField } from '@/components/custom/fields/select-field'
import { FilterList } from '@/components/custom/filter-list'

import type { CategoryInterface } from '@/types/categories'
import type { SortInterface } from '@/types/sort'

interface FilterBarProps {
  categories: CategoryInterface[]
  currentSort: SortInterface
}

function FilterBar({ categories, currentSort }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

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
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <aside className="relative z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-2 shadow-(--shadow)">
      <FilterList categories={categories} />

      <SelectField
        options={sortValuesList}
        defaultValue={currentSort}
        onValueChange={sortTrigger}
      />
    </aside>
  )
}

export { FilterBar }
