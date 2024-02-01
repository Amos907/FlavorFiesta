"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import { Badge, ActionIcon, Text, Button } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

import MainWrapper from "./components/main-wrapper";
import {
  HorizScrollContainer,
  FlierCard,
} from "./components/horiz-scroll-container";
import TopNav from "./components/layout/top-nav";
import { fruitsData } from "../../utils/fruits-data";

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
            <div className="rounded-[0.3rem] border p-2" key={item}>
              <figure className="h-56 w-full rounded-t relative">
                <Image
                  className="rounded"
                  src={faker.image.food(512, 512, consume_data)}
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="100vw"
                  alt=""
                />
                {/* <div className="absolute top-1 left-1">
                  <Badge>{faker.datatype.number(100)} Points</Badge>
                </div> */}

                <div className="absolute -bottom-3 right-1">
                  <ActionIcon
                    size="lg"
                    className="bg-white shadow-md"
                    variant="default"
                    radius="xl"
                  >
                    <IconHeart className="flex items-center" />
                  </ActionIcon>
                </div>
              </figure>

              <div className="w-full p-3">
                <p className="text-lg font-bold capitalize mt-1">
                  {faker.lorem.words(2)}
                </p>

                <div className="text-gray-700 capitalize text-xs mt-[0.5]">
                  {faker.lorem.sentence()}
                </div>

                <div className="mt-3">
                  <Link href={`/recipe/${faker.number.int(10000)}`}>
                    <Button fullWidth variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
