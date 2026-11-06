'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Badge } from '@/components/ui/badge'

type RecipeCardContentProps = {
  tags: string[]
}

function RecipeCardContent({ tags }: RecipeCardContentProps ) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: false, end: false })

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
  }, [updateEdges, tags])

  return (
    <>
      {tags.length > 0 ? (
        <div
          data-start={edges.start}
          data-end={edges.end}
          className='relative before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-7 before:bg-gradient-to-r before:from-white before:to-transparent before:opacity-0 before:transition-opacity before:content-[""] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-7 after:bg-gradient-to-l after:from-white after:to-transparent after:opacity-0 after:transition-opacity after:content-[""] data-[end=true]:after:opacity-100 data-[start=true]:before:opacity-100'
        >
          <div
            ref={scrollRef}
            onScroll={updateEdges}
            className="[scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex flex-nowrap gap-1">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="outline">{tag}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <span className="text-foreground/40">Pas de catégorie</span>
      )}
    </>
  )
}

export { RecipeCardContent }
