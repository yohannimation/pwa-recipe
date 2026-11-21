import { RecipeForm } from "@/components/custom/form/recipe/recipe-form";

import { serverApi } from '@/lib/api/server'

import type { CategoryInterface } from '@/types/categories'

export default async function RecipeAdd() {
  const categories = (await serverApi<CategoryInterface[]>('/categories')) ?? []

  return <>
    <h1>Form to add a recipe</h1>

    <RecipeForm categories={categories} />
  </>
}