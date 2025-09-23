import { Request, Response } from 'express';
import { RecipeInterface, RecipeListInterface } from '../models/recipeModels';

import * as recipeService from '../services/recipeService';

export const getRecipes = async (_req: Request, res: Response) => {
  try {
    const recipes: RecipeListInterface[] = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const recipe: RecipeInterface | null = await recipeService.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
};
