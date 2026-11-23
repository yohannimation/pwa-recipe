'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Blobatar } from '@/components/ui/blobatar'

import type { CategoryInterface } from '@/types/categories'

type RecipeCardContentProps = {
  categories: CategoryInterface[]
  numberPeople: number
  likedBy: string[]
}

function RecipeCardContent({ categories, numberPeople, likedBy }: RecipeCardContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: false, end: false })

  const likeCount = 3

  const updateEdges = useCallback(() => {
    const element = scrollRef.current
    if (!element) return
    const { scrollLeft, scrollWidth, clientWidth } = element
    setEdges({
      start: scrollLeft > 0,
      end: Math.ceil(scrollLeft + clientWidth) < scrollWidth,
    })
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return
    updateEdges()

    // Recalculate when the container width or the list change
    const observer = new ResizeObserver(updateEdges)
    observer.observe(element)
    if (element.firstElementChild) observer.observe(element.firstElementChild)
    return () => observer.disconnect()
  }, [updateEdges, categories])

  return (
    <div className="flex flex-col gap-2">
      {/* Categories part */}
      {categories.length > 0 ? (
        <div
          data-start={edges.start}
          data-end={edges.end}
          className='relative before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-1 before:w-7 before:bg-gradient-to-r before:from-white before:to-transparent before:opacity-0 before:transition-opacity before:content-[""] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-1 after:w-7 after:bg-gradient-to-l after:from-white after:to-transparent after:opacity-0 after:transition-opacity after:content-[""] data-[end=true]:after:opacity-100 data-[start=true]:before:opacity-100'
        >
          <div
            ref={scrollRef}
            onScroll={updateEdges}
            className="[scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex flex-nowrap gap-1">
              <li key={`number-people-${numberPeople}`}>
                <Badge variant="outline">
                  {numberPeople} personne{numberPeople > 1 && 's'}
                </Badge>
              </li>

              {categories.map((category) => (
                <li key={category.id}>
                  <Badge variant="outline">{category.name}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <span className="text-foreground/40">Pas de catégorie</span>
      )}

      {/* Liked by part */}
      {likedBy.length > 0 && (
        <Badge variant={'ghost'} className="h-8 overflow-visible rounded-none border-none">
          Aimé par
          <AvatarGroup>
            {/* Display X Blobatar */}
            {likedBy.slice(0, likeCount).map((user) => (
              <Blobatar
                key={user}
                name={user}
                blobatar={{ background: 'circle', animate: 'always' }}
                title={user}
              />
            ))}

            {likedBy.length > likeCount && (
              <AvatarGroupCount>+{likedBy.length - likeCount}</AvatarGroupCount>
            )}
          </AvatarGroup>
        </Badge>
      )}
    </div>
  )
}

export { RecipeCardContent }
