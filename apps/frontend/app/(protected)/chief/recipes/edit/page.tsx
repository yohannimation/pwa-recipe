'use client'

import { useRouter } from "next/navigation";

export default function RecipesEdit404() {
  const router = useRouter()

  // Route `chief/recipe/edit` is not valid (how to edit a non specified recipe ?)
  router.replace('/chief/recipes')
}