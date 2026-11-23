'use client'

import { useState } from 'react'

import { ImageIcon } from 'lucide-react'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'

type RecipeCardImageProps = {
  image?: string
  alt: string
}

function RecipeCardImage({ image, alt }: RecipeCardImageProps) {
  const hasImgUrl = image != null
  const [imgLoaded, setImgLoaded] = useState<boolean>(!hasImgUrl) // If there is an img url, we want to load it
  const [imgLoadError, setImgLoadError] = useState<boolean>(!hasImgUrl) // If there is an img url, we do not want an error

  return (
    <div className="relative aspect-video w-full">
      {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
      {imgLoadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <ImageIcon size={32} />
        </div>
      )}
      {hasImgUrl && (
        <Image
          src={`/uploads/recipes/${image}`}
          fill
          loading="lazy"
          alt={alt}
          className="object-cover"
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgLoadError(true)
            setImgLoaded(true)
          }}
        />
      )}
    </div>
  )
}

export { RecipeCardImage }
