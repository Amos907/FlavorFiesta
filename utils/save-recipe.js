export const toggleRecipe = (name, id, image) => {
  const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

  const recipeExists = existingRecipes.some((recipe) => recipe.id === id);

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
