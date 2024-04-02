import React from "react";
import { getSession } from "../../../../lib";
import SavedRecipesContainer from "@/app/components/user/saved-recipes/saved-recipes-container";
import TopNav from "@/app/components/layout/top-nav";

export default async function SavedRecipes() {
  const session = await getSession();

  return (
    <main className="lg:px-40">
      <TopNav />
      <div className="m-3">
        <SavedRecipesContainer userId={session.payload.id} />
      </div>
    </main>
  );
}
