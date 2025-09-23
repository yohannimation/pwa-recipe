import { db } from '../config/db';
import { RecipeInterface } from '../models/recipeModels';

export const getAllRecipes = async (): Promise<RecipeInterface[]> => {
  const [rows] = await db.query('SELECT * FROM recipes');
  return rows as RecipeInterface[];
};

export const getRecipeById = async (id: number): Promise<RecipeInterface | null> => {
  const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
  const users = rows as RecipeInterface[];
  return users.length > 0 ? users[0] : null;
};
