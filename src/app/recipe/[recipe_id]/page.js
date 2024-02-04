"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipeInfo,
  fetchRandomRecipes,
} from "@/redux/features/recipeSlice";

import { FlierCard } from "@/app/components/horiz-scroll-container";
import TopNav from "@/app/components/layout/top-nav";
import { Button, Loader } from "@mantine/core";
import { HorizScrollContainer } from "@/app/components/horiz-scroll-container";
import { cleanUpText } from "../../../../utils/cleaupResponse";

const Recipe = ({ params }) => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const { recipeInfo, randomRecipes, requestStatus } = useSelector(
    (state) => state.recipe
  );

  const recipe_id = params.recipe_id;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser((initialUser) => (initialUser = localStorage.getItem("user")));
    }

    if (recipe_id) {
      dispatch(fetchRecipeInfo({ recipeId: parseInt(recipe_id) }));
    }

    if (requestStatus.fetchRandomRecipesStatus === "idle") {
      dispatch(fetchRandomRecipes());
    }
  }, [requestStatus.fetchRandomRecipesStatus, recipe_id, dispatch]);

  return (
    <main className="lg:px-40">
      <TopNav />

      {requestStatus.fetchRecipeInfoStatus === "success" &&
      requestStatus.fetchRandomRecipesStatus === "success" ? (
        <div className="m-3">
          {recipeInfo ? (
            <div>
              <div className="flex flex-col-reverse justify-center md:flex-row md:items-center md:pt-6 md:pb-6 md:p-2 md:bg-light-200 rounded-lg lg:shadow-sm">
                <div className="px-2 flex flex-col md:flex-1">
                  <div className="md:flex justify-between">
                    <h2 className="text-3xl font-bold text-primary">
                      {recipeInfo.title}
                    </h2>
                  </div>

                  <p className="mt-1 text-gray-700 font-serif overflow-hidden">
                    {cleanUpText(recipeInfo.summary)}
                  </p>

                  <div className="grid grid-cols-3 py-3 divide-x">
                    <div className="text-center space-y-1">
                      <p className="text-gray-600 text-4xl font-sans">
                        {recipeInfo.extendedIngredients.length}
                      </p>
                      <p className="text-gray-600 font-sans">Ingredients</p>
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-gray-600 text-4xl font-sans">
                        {recipeInfo.readyInMinutes}
                      </p>
                      <p className="text-gray-600 font-sans">Minutes</p>
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-gray-600 text-4xl font-sans">
                        {recipeInfo.servings}
                      </p>
                      <p className="text-gray-600 font-sans">Servings</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="pt-2">
                      <p className="font-sans text-lg font-bold text-primary">
                        Dish Types
                      </p>
                      <div className="space-y-2">
                        {recipeInfo.dishTypes.map((dish) => (
                          <p key={dish} className="text-gray-700 font-sans">
                            {dish}
                          </p>
                        ))}
                      </div>
                    </div>
                    {recipeInfo.winePairing.pairedWines ? (
                      <div className="pt-2">
                        <p className="font-sans text-lg font-bold text-primary">
                          Wine Parings
                        </p>
                        <div className="space-y-2">
                          {recipeInfo.winePairing.pairedWines.map((wine) => (
                            <p key={wine} className="text-gray-700 font-sans">
                              {wine}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {user ? (
                    <Button
                      // onClick={}
                      color="blue"
                      variant="outline"
                      fullWidth
                      className="mt-4"
                    >
                      Save
                    </Button>
                  ) : (
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        color="blue"
                        fullWidth
                        className="mt-4"
                      >
                        Save
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="w-full py-auto mb-4 md:w-1/2">
                  <figure className="h-80 mt-1 w-full relative cursor-pointer md:h-80 shadow-lg rounded-lg">
                    <Image
                      className="rounded-lg"
                      src={recipeInfo.image}
                      style={{ objectFit: "center" }}
                      fill
                      sizes="100vw"
                      alt=""
                    />
                  </figure>
                </div>
              </div>

              <div className="lg:grid grid-cols-2">
                <div className="space-y-2 text-center">
                  <p className="text-2xl font-bold pt-4 font-sans text-primary">
                    Ingredients
                  </p>
                  <div className="space-y-2">
                    {recipeInfo.extendedIngredients.map((ingredient) => (
                      <p
                        key={ingredient.id}
                        className="text-gray-700 font-sans"
                      >
                        {ingredient.name}{" "}
                        <span className="text-gray-500">
                          ({ingredient.measures.metric.amount}{" "}
                          {ingredient.measures.metric.unitLong})
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 lg:my-auto text-center">
                  <p className="text-2xl font-bold pt-4 font-sans text-primary">
                    Instrutions
                  </p>
                  {recipeInfo.analyzedInstructions[0] ? (
                    <div className="space-y-2">
                      {recipeInfo.analyzedInstructions[0].steps.map((step) => (
                        <div key={step} className="flex space-x-1">
                          <figure className="h-5 w-5 relative cursor-pointer">
                            <Image
                              className="rounded-lg"
                              src="/images/icons/tick.svg"
                              style={{ objectFit: "cover" }}
                              fill
                              sizes="100vw"
                              alt=""
                            />
                          </figure>
                          <p
                            key={step.number}
                            className="text-gray-700 font-sans"
                          >
                            {step.step}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700">
                        No Instructions available!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="">
            <div>
              <h1 className="p-3 px-0 text-xl font-bold capitalize text-primary">
                You may also like
              </h1>
              <div className="no-scrollbar flex overflow-x-scroll">
                {randomRecipes.recipes ? (
                  <HorizScrollContainer>
                    {randomRecipes.recipes.map((recipe) => (
                      <FlierCard key={recipe.id} recipe={recipe} />
                    ))}
                  </HorizScrollContainer>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader color="blue" />
      )}
    </main>
  );
};

export default Recipe;
