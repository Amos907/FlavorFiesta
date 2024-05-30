"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SavedRecipeWidget from "./saved-recipe-widget";
import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Recipe } from "../../../recipe/recipe";

const SavedRecipesContainer = () => {
  const router = useRouter();
  const [savedRecipes, setSavedRecipes] = useState([]);
  // console.log(userId);
  return (
    <>
      <div className="px-2 flex justify-between">
        <p className="text-xl font-sans text-primary font-bold">
          Saved Recipes
        </p>
        <Button
          className=""
          size="xs"
          variant="outline"
          // leftIcon={<IconChevronLeft />}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
      </div>
      {savedRecipes.length > 0 ? (
        <div className="space-y-2 md:grid grid-cols-3 lg:grid-cols-4 gap-4">
          {savedRecipes.map<JSX.Element>((recipe: Recipe) => (
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
