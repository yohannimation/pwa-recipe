'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Blobatar } from '@/components/ui/blobatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Cta } from '@/components/custom/cta'

import { ArrowRight, CookingPot, Timer } from 'lucide-react'

type RecipeProps = {
  id: number
  name: string
  image: string
  preparationTime: number
  cookingTime: number
  likedBy: string[]
  tags: string[]
  url: string
}

function RecipeCard({ recipe }: { recipe: RecipeProps }) {
  const { id, name, image, preparationTime, cookingTime, likedBy, tags, url } =
    recipe

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

  const preparationTimeContent = (
    <Badge variant={'ghost'} className="rounded-none border-none">
      <Timer /> {preparationTime}min
    </Badge>
  )

  const cookingTimeContent = (
    <>
      {' | '}{' '}
      <Badge variant={'ghost'} className="rounded-none border-none">
        <CookingPot /> {cookingTime}min
      </Badge>
    </>
  )

  const likedByContent = (
    <>
      {' | '}
      <AvatarGroup>
        {/* Display 3 Blobatar */}
        {likedBy.slice(0, 3).map((user) => (
          <Blobatar
            key={user}
            name={user}
            blobatar={{ background: 'circle', animate: 'always' }}
            title={`Aimé par ${user}`}
          />
        ))}

        {likedBy.length > 3 && (
          <AvatarGroupCount>+{likedBy.length - 3}</AvatarGroupCount>
        )}
      </AvatarGroup>
    </>
  )

  const cardContent =
    tags.length > 0 ? (
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
    )

  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative aspect-video w-full">
        <Image
          src={image}
          fill
          loading="lazy"
          alt={name}
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <div className="flex h-8 items-center gap-2">
            {preparationTimeContent}
            {cookingTime > 0 && <>{cookingTimeContent}</>}
            {likedBy.length > 0 && <>{likedByContent}</>}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>{cardContent}</CardContent>

      <CardFooter className="justify-end">
        <Cta
          text="Voir la recette"
          icon={<ArrowRight />}
          href={url}
          size="md"
        />
      </CardFooter>
    </Card>
  )
}

export { RecipeCard }
export type { RecipeProps }
