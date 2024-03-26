"use client";

import React, { useState } from "react";
import SavedRecipeWidget from "./saved-recipe-widget";

const SavedRecipesContainer = ({ userId }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  return (
    <>
      {savedRecipes.length > 0 ? (
        <div className="space-y-2 md:grid grid-cols-3 lg:grid-cols-4 gap-4">
          {savedRecipes.map((recipe) => (
            <SavedRecipeWidget recipe={recipe} key={recipe.id} />
          ))}
        </div>
      ) : (
        <p>No saved recipes yet.</p>
      )}
    </>
  );
};

export default SavedRecipesContainer;
