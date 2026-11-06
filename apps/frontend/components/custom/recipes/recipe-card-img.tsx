'use client'

import Image from 'next/image'
import { useState } from 'react'

import { ImageIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type RecipeCardImageProps = {
  image: string
  alt: string
}

function RecipeCardImage({ image, alt }: RecipeCardImageProps ) {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false)
  const [imgLoadError, setImgLoadError] = useState<boolean>(false)

  return (
    <div className="relative aspect-video w-full">
      {!imgLoaded &&
        <Skeleton className='absolute inset-0 rounded-none' />
      }
      {imgLoadError &&
        <div className='absolute inset-0 flex justify-center items-center bg-muted/50'>
          <ImageIcon size={32} />
        </div>
      }
      <Image
        src={image}
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
    </div>
  )
}

export { RecipeCardImage }
