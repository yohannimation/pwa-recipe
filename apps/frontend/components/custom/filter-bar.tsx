'use client'

import { useState } from 'react'

import { SelectField } from '@/components/custom/fields/select-field'
import { FilterList } from '@/components/custom/filter-list'

import type { CategoryInterface } from '@/types/categories'

function FilterBar({ categories }: { categories: CategoryInterface[] }) {
  const [sortValue, setSortValue] = useState<string>('alphabetical')

  const sortValuesList = [
    { value: 'alphabetical', label: 'Tri par ordre alphabétique' },
    { value: 'creation', label: 'Tri par date de création' },
  ]

  const sortTrigger = (value: string) => {
    setSortValue(value)
    console.log('sort value :', value)
  }

  return (
    <aside className="relative z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-2 shadow-(--shadow)">
      <FilterList categories={categories} />

      <SelectField
        options={sortValuesList}
        defaultValue={sortValue}
        onValueChange={sortTrigger}
      />
    </aside>
  )
}

export { FilterBar }
