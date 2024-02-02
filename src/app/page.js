"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

import MainWrapper from "./components/main-wrapper";
import {
  HorizScrollContainer,
  FlierCard,
} from "./components/horiz-scroll-container";
import TopNav from "./components/layout/top-nav";
import { fruitsData } from "../../utils/fruits-data";
import RecipeWidget from "./components/recipe-widget";

export default function Home() {
  const consume_data = process.env.NEXT_PUBLIC_FAKER_DATA_HEAVY === "true";

  const [fact, setFact] = useState(null);
  console.log(fact);
  useEffect(() => {
    let new_fact = Math.random() * (15 - 0) + 0;
    setFact((initialFact) => (initialFact = Math.round(new_fact)));
  }, []);
  return (
    <main main className="lg:px-40">
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
          Cuisine of the Day
        </p>
        <div className="bg-gray-100 pt-2 px-2">
          <HorizScrollContainer>
            {faker.datatype.array(9).map((item) => (
              <div className="" key={item}>
                <FlierCard />
              </div>
            ))}
          </HorizScrollContainer>
        </div>
      </div>

      <div className="m-4">
        <p className="text-xl font-bold font-sans text-primary py-2">
          Popular Recipes
        </p>

        <div className="space-y-2 md:grid grid-cols-3 lg:grid-cols-4 gap-4">
          {faker.datatype.array(15).map((item) => (
            <RecipeWidget key={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
