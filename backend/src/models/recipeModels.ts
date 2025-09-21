import { CategoryTypeInterface } from './categoryTypeModels';
import { IngredientInterface } from './ingredientModels';
import { StepInterface } from './stepModels';

export interface RecipeInterface {
  id: number;
  title: string;
  imageName: string;
  preparationTime: number;
  cookTime: number;
  numberPeople: number;
  categories: CategoryTypeInterface[];
  ingredients: IngredientInterface[];
  steps: StepInterface[];
}

export interface RecipeListInterface {
  id: number;
  title: string;
  imageName: string;
  preparationTime: number;
  cookTime: number;
  categories: CategoryTypeInterface[];
}

// ------------------------------------------
//      Recipe data example
// ------------------------------------------
// {
//   "id": 123,
//   "title": "nom de recette",
//   "imageName": "image-name.jpg",
//   "preparationTime": 15,
//   "cookTime": 20,
//   "numberPeople": 2,
//   "categories": [
//       {
//           "id": 123,
//           "name": "auteur",
//           "categories": [
//               {
//                   "id": 123,
//                   "name": "Yohann"
//               }
//           ]
//       },
//       {
//           "id": 223,
//           "name": "Type de plat",
//           "categories": [
//               {
//                   "id": 223,
//                   "name": "Apéritif"
//               },
//               {
//                   "id": 323,
//                   "name": "Plat principal"
//               }
//           ]
//       }
//   ],
//   "ingredients": [
//       {
//           "id": 123,
//           "id_api": 123456,
//           "name": "Tomate",
//           "imageName": "image-name-from-api.png",
//           "quantity": 1,
//           "unit": ""
//       },
//       {
//           "id": 223,
//           "id_api": 987654,
//           "name": "Crème fraiche",
//           "imageName": "azerty.png",
//           "quantity": 20,
//           "unit": "cl"
//       }
//   ],
//   "steps": [
//       {
//           "id": 123,
//           "stepNumber": 1,
//           "description": "Etape numéro 1"
//       },
//       {
//           "id": 223,
//           "stepNumber": 2,
//           "description": "Etape numéro 2"
//       },
//       {
//           "id": 323,
//           "stepNumber": 3,
//           "description": "Etape numéro 3"
//       }
//   ]
// }
