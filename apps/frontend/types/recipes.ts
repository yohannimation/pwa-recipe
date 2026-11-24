import { CategoryInterface } from '@/types/categories'
import { SortInterface } from '@/types/sort'
import { UserInterface } from '@/types/users'

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
  user: UserInterface
  createdAt: string
  updatedAt: string
}

export type RecipeFilterInterface = {
  sort: SortInterface
  name?: string
  categories?: string[]
}
