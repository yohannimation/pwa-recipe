export type CategoryInterface = {
  id: number
  name: string
  idParent: number
  children: CategoryInterface[]
  createdAt: string
  updatedAt: string
}