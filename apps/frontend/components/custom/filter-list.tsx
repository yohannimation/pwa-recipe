'use client'

import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CheckboxField } from '@/components/custom/fields/checkbox-field'
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

import { Settings2 } from 'lucide-react'
import { useMediaQuery } from '@/lib/useMediaQuery'

function FilterList() {
  const [open, setOpen] = useState<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const categories = [
    {
      name: 'Type de plat',
      value: 'plat',
      children: [
        { name: 'Apéritif' },
        { name: 'Entrée' },
        { name: 'Plat' },
        { name: 'Dessert' },
        { name: 'Petit-déjeuner' },
      ],
    },
    {
      name: 'Type de cuisine',
      value: 'cuisine',
      children: [
        { name: 'Chinois' },
        { name: 'Européen' },
        { name: 'Américain' },
      ],
    },
    {
      name: 'Temps de préparation',
      value: 'preparation',
      children: [
        { name: '10min' },
        { name: '20min' },
        { name: '30min' },
        { name: '40min' },
        { name: '50min' },
      ],
    },
    {
      name: 'Goût',
      value: 'gout',
      children: [
        { name: 'Salé' },
        { name: 'Sucré' },
        { name: 'Épicé' },
        { name: 'Acide' },
      ],
    },
    {
      name: 'Ingrédient principal',
      value: 'ingredient',
      children: [{ name: 'Viande' }, { name: 'Legume' }, { name: 'Fruit' }],
    },
  ]

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
            {/* Colonne 1 : Index pairs (0, 2, 4...) */}
            <Accordion
              type="multiple"
              defaultValue={['plat']}
              className="w-full flex-1"
            >
              {categories
                .filter((_, i) => i % 2 === 0)
                .map((category) => (
                  <AccordionItem key={category.value} value={category.value}>
                    <AccordionTrigger>{category.name}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1.5">
                        {category.children.map((child) => (
                          <li key={child.name}>
                            <CheckboxField label={child.name} />
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>

            {/* Colonne 2 : Index impairs (1, 3, 5...) */}
            <Accordion type="multiple" className="w-full flex-1">
              {categories
                .filter((_, i) => i % 2 !== 0)
                .map((category) => (
                  <AccordionItem key={category.value} value={category.value}>
                    <AccordionTrigger>{category.name}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1.5">
                        {category.children.map((child) => (
                          <li key={child.name}>
                            <CheckboxField label={child.name} />
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </>
        ) : (
          <Accordion type="multiple">
            {categories.map((category) => {
              return (
                <AccordionItem key={category.value} value={category.value}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-1.5">
                      {category.children.map((child) => {
                        return (
                          <li key={child.name}>
                            <CheckboxField label={child.name} />
                          </li>
                        )
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </div>
    </div>
  )
  const footer = (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button variant={'outline'} className="flex-1">
        Réinitialiser tous les filtres
      </Button>
      <Button className="flex-1">Appliquer</Button>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
    <Drawer open={open} onOpenChange={setOpen}>
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
