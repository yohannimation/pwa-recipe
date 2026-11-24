'use client'

import { useState, useTransition } from 'react'

import { Settings2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { CheckboxField } from '@/components/custom/fields/checkbox-field'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { useMediaQuery } from '@/lib/useMediaQuery'

import type { CategoryInterface } from '@/types/categories'

/**
 * Default opened groups :
 * - Each one containing minimum one sub-category selected
 * - Else, uniquely the first group
 */
function getInitialOpenGroups(categories: CategoryInterface[], selected: string[]): string[] {
  const withSelection = categories
    .filter((category) => category.children.some((child) => selected.includes(child.name)))
    .map((category) => category.name)

  if (withSelection.length > 0) return withSelection

  return categories[0] ? [categories[0].name] : []
}

function CategoryAccordion({
  groups,
  openGroups,
  onOpenGroupsChange,
  selected,
  onToggle,
}: {
  groups: CategoryInterface[]
  openGroups: string[]
  onOpenGroupsChange: (value: string[]) => void
  selected: string[]
  onToggle: (name: string) => void
}) {
  return (
    <Accordion
      type="multiple"
      value={openGroups}
      onValueChange={onOpenGroupsChange}
      className="w-full flex-1"
    >
      {groups.map((category) => (
        <AccordionItem key={category.name} value={category.name}>
          <AccordionTrigger>{category.name}</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-1.5">
              {category.children.map((child) => (
                <li key={child.name}>
                  <CheckboxField
                    label={child.name}
                    onCheckedChange={() => onToggle(child.name)}
                    checked={selected.includes(child.name)}
                  />
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function FilterList({ categories }: { categories: CategoryInterface[] }) {
  // Display state
  const [open, setOpen] = useState<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // Params state
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const categoriesParam = 'categories'
  const selected = searchParams.getAll(categoriesParam)

  // Accordion state (opened groups)
  const [openGroups, setOpenGroups] = useState<string[]>(() =>
    getInitialOpenGroups(categories, selected)
  )

  const handleOpenChange = (value: boolean) => {
    if (value) setOpenGroups(getInitialOpenGroups(categories, selected))
    setOpen(value)
  }

  /**
   * Desktop: two accordions share the same state
   * Each one update they groups
   */
  const updateColumn = (columnGroups: CategoryInterface[]) => (value: string[]) => {
    const columnNames = columnGroups.map((category) => category.name)
    setOpenGroups((prev) => [...prev.filter((name) => !columnNames.includes(name)), ...value])
  }

  const toggle = (name: string) => {
    const next = selected.includes(name)
      ? selected.filter((category) => category !== name)
      : [...selected, name]

    const params = new URLSearchParams(searchParams.toString())
    params.delete(categoriesParam) // Delete all occurrences
    next.forEach((c) => params.append(categoriesParam, c)) // And rewrite them

    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  const reset = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(categoriesParam) // Delete all occurrences

    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  const evenGroups = categories.filter((_, i) => i % 2 === 0)
  const oddGroups = categories.filter((_, i) => i % 2 !== 0)

  const trigger = (
    <div>
      <Button className="hidden sm:flex">
        <Settings2 /> Filtres
      </Button>
      <Button size={'icon'} className="block rounded-lg p-2 sm:hidden">
        <Settings2 />
      </Button>
    </div>
  )
  const title = <>Filtres</>
  const main = (
    <div className="no-scrollbar overflow-y-auto">
      <div className="flex flex-col items-start gap-x-8 lg:flex-row">
        {isDesktop ? (
          <>
            {/* Column 1 : pairs index (0, 2, 4...) */}
            <CategoryAccordion
              groups={evenGroups}
              openGroups={openGroups}
              onOpenGroupsChange={updateColumn(evenGroups)}
              selected={selected}
              onToggle={toggle}
            />

            {/* Column 2 : impairs index (1, 3, 5...) */}
            <CategoryAccordion
              groups={oddGroups}
              openGroups={openGroups}
              onOpenGroupsChange={updateColumn(oddGroups)}
              selected={selected}
              onToggle={toggle}
            />
          </>
        ) : (
          <CategoryAccordion
            groups={categories}
            openGroups={openGroups}
            onOpenGroupsChange={setOpenGroups}
            selected={selected}
            onToggle={toggle}
          />
        )}
      </div>
    </div>
  )
  const footer = (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button variant={'outline'} className="flex-1" onClick={reset}>
        Réinitialiser tous les filtres
      </Button>
      <Button className="flex-1" onClick={() => setOpen(false)}>
        Appliquer
      </Button>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="min-w-170">
          {/* Dialog header */}
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {/* Dialog main */}
          {main}

          {/* Dialog footer */}
          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        {/* Drawer header */}
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>

        {/* Drawer main */}
        {main}

        {/* Drawer footer */}
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export { FilterList }
