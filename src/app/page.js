"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCuisineRecipes,
  fetchRandomRecipes,
} from "../redux/features/recipeSlice";

import {
  HorizScrollContainer,
  FlierCard,
} from "./components/horiz-scroll-container";
import TopNav from "./components/layout/top-nav";
import { fruitsData } from "../../utils/fruits-data";
import { cuisineNames } from "../../utils/cuisine-names";
import RecipeWidget from "./components/recipe-widget";

import { Loader } from "@mantine/core";

export default function Home() {
  const { cuisineRecipes, randomRecipes, requestStatus } = useSelector(
    (state) => state.recipe
  );
  const dispatch = useDispatch();

  const [fact, setFact] = useState(null);

  const [cuisine, setCuisine] = useState(0);

  const is24HoursPassed = (lastUpdateTime) => {
    const currentTime = new Date().getTime();
    return (
      !lastUpdateTime ||
      currentTime - parseInt(lastUpdateTime) > 24 * 60 * 60 * 1000
    );
  };

  useEffect(() => {
    let new_cusine = Math.round(Math.random() * (20 - 0) + 0);

    if (typeof window !== "undefined") {
      if (!localStorage.getItem("lastUpdetTime")) {
        localStorage.setItem("lastUpdateTime", new Date().getTime());
      }

      if (!localStorage.getItem("cuisine")) {
        localStorage.setItem("cuisine", cuisineNames[4]);
      }

      setCuisine(localStorage.getItem("cuisine"));

      dispatch(
        fetchCuisineRecipes({
          cusine: cuisineNames[localStorage.getItem("cuisine")],
        })
      );
    }

    if (is24HoursPassed(localStorage.getItem("lastRequestTime"))) {
      localStorage.setItem("lastRequestTime", new Date().getTime());
      localStorage.setItem("cuisine", new_cusine);
    }

    let new_fact = Math.random() * (15 - 0) + 0;
    setFact((initialFact) => (initialFact = Math.round(new_fact)));

    if (requestStatus.fetchRandomRecipesStatus === "idle") {
      dispatch(fetchRandomRecipes());
    }
  }, [requestStatus.fetchRandomRecipesStatus, dispatch]);

  return (
    <main className="lg:px-40">
      <TopNav />
      <div className="py-0">
        {fact ? (
          <div className="rounded-md py-3 md:flex items-center justify-center md:space-x-8">
            <div className="md:w-80 text-center py-2">
              <p className="text-xl font-sans font-semibold text-primary lg:text-2xl">
                {fruitsData[fact].fact}
              </p>
            </div>
            <div className="space-y-2 flex justify-center">
              <figure className="h-48 w-80 lg:h-64 relative">
                <Image
                  className="rounded-sm"
                  src={fruitsData[fact].image}
                  alt="Fruit Image"
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="100vh"
                />
              </figure>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="m-4">
        <p className="text-xl font-bold font-sans text-primary py-2">
          Cuisine of the Day:{" "}
          <span className="text-2xl">{cuisineNames[cuisine]}</span>
        </p>

        {requestStatus.fetchCuisineRecipesStatus === "success" &&
        cuisineRecipes.results ? (
          <div className="bg-gray-100 pt-2 px-2">
            <HorizScrollContainer>
              {cuisineRecipes.results.map((recipe) => (
                <FlierCard key={recipe.id} recipe={recipe} />
              ))}
            </HorizScrollContainer>
          </div>
        ) : (
          <div className="p-3">
            <Loader color="blue" />
          </div>
        )}
      </div>

      <div className="m-4">
        <p className="text-xl font-bold font-sans text-primary py-2">
          Popular Recipes
        </p>
        {requestStatus.fetchRandomRecipesStatus === "success" &&
        randomRecipes.recipes ? (
          <div className="space-y-2 md:grid grid-cols-3 lg:grid-cols-4 gap-4">
            {randomRecipes.recipes.map((recipe) => (
              <RecipeWidget key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="p-3">
            <Loader color="blue" />
          </div>
        )}
      </div>
    </main>
  );
}
