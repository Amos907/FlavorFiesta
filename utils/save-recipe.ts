import { Recipe } from "../src/app/recipe/recipe";

export const toggleRecipe = (recipe: Recipe) => {
  const existingRecipes: string[] | null = JSON.parse(
    localStorage.getItem("recipes")
  );
  const recipeExists: boolean = existingRecipes.some<boolean>(
    (recipe: Recipe) => recipe.id === id
  );

  if (recipeExists) {
    const indexToRemove = existingRecipes.findIndex(
      (recipe) => recipe.id === id
    );
    existingRecipes.splice(indexToRemove, 1);
  } else {
    const newRecipe = { name, id, image };
    existingRecipes.push(newRecipe);
  }

  localStorage.setItem("recipes", JSON.stringify(existingRecipes));
};

export const isSaved = (recipeId) => {
  const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

  return savedRecipes.some((recipe) => recipe.id == recipeId);
};
