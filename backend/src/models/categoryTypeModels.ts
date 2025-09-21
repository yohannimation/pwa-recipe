import { CategoryInterface } from './categoryModels';

export interface CategoryTypeInterface {
  id: number;
  name: string;
  categories: CategoryInterface[];
}
