import { Router } from 'express';
import {
  getRecipes,
  getRecipeById,
  // getRecipeByFilter,
  // createRecipe,
  // updateRecipe,
  // deleteRecipe,
} from '../controllers/recipeController';

const router = Router();

// Getter
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
// router.post('/search', getRecipeByFilter);

// Setter
// router.post('/', createRecipe);

// Updater
// router.put('/:id', updateRecipe);

// Deleter
// router.delete('/:id', deleteRecipe);

export default router;
