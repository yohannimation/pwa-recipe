import { CategoryInterface } from "@/types/categories"

export type RecipeInterface = {
  id: number
  name: string
  imageName?: string
  preparationTime: number
  cookTime: number
  numberPeople: number
  categories: CategoryInterface[]
  steps: undefined
  ingredients: undefined
  user: undefined
  createdAt: string
  updatedAt: string
}