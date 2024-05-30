import React from "react";
import { getSession } from "../../../../lib";
import SavedRecipesContainer from "../../components/user/saved-recipes/saved-recipes-container";
import SavedRecipeWidget from "../../components/user/saved-recipes/saved-recipe-widget";
import TopNav from "../../components/layout/top-nav";
import { fetchSavedRecipes } from "../../../../lib";

export default async function SavedRecipes() {
  // const session = await getSession();
  // const id = session?.payload.id;
  

  return (
    <main className="lg:px-40">
      <TopNav />
      <div className="m-3">
        <SavedRecipesContainer />
      </div>
    </main>
  );
}
