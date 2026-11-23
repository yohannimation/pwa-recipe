'use client'

import { useRouter } from 'next/navigation'

export default function Chief404() {
  const router = useRouter()

  // Route `chief/` is not valid
  router.replace('/chief/recipes')
}
