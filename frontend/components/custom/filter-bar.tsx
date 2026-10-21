'use client'

import { useState } from "react"

import { SelectField } from "@/components/custom/fields/select-field"
import { FilterList } from "@/components/custom/filter-list"

function FilterBar() {
  const [sortValue, setSortValue] = useState<string>("alphabetical")

  const sortValuesList = [
    { value: 'alphabetical', label: 'Tri par ordre alphabétique' },
    { value: 'creation', label: 'Tri par date de création' },
  ]

  const sortTrigger = (value: string) => {
    setSortValue(value)
    console.log("sort value :", value)
  }

  return (
    <aside className="relative bg-white mt-2 md:mt-10 mb-5 p-2 rounded-xl shadow-(--shadow) flex justify-between items-center gap-2 flex-wrap">
      <FilterList />

      <SelectField
        options={sortValuesList}
        defaultValue={sortValue}
        onValueChange={sortTrigger}
      />
    </aside>
  )
}

export { FilterBar }
