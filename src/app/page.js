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
    <main>
      <TopNav />
      <div className="m-4">
        {fact ? (
          <div className="border rounded-md px-5 py-3 shadow-md">
            <div className="flex justify-between items-center pb-2">
              <figure className="w-7 h-7 relative">
                <Image
                  className="rounded-lg"
                  src="/images/icons/idea.svg"
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="100vh"
                  alt=""
                />
              </figure>

              <p className="text-xl font-serif  text-blue-600">Fun Fact</p>
            </div>
            <div className="space-y-2 m-2">
              <figure className="h-48 w-full relative">
                <Image
                  className="rounded-md"
                  src={fruitsData[fact].image}
                  alt="Fruit Image"
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="100vh"
                />
              </figure>
              <div className="">
                <p className="text-xl font-serif text-gray-700 font-semibold">
                  {fruitsData[fact].fact}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="m-4">
        <p className="text-2xl font-bold pt-4 font-serif">Cuisine of the Day</p>
        <HorizScrollContainer>
          {faker.datatype.array(3).map((item) => (
            <div className="" key={item}>
              <FlierCard />
            </div>
          ))}
        </HorizScrollContainer>
      </div>

      <div className="m-4">
        <p className="text-2xl font-bold pt-4 font-serif">Popular Recipes</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {faker.datatype.array(15).map((item) => (
            <div className="bg-white rounded-[0.3rem]" key={item}>
              <figure className="h-56 w-full rounded-t bg-gray-200 relative">
                <Image
                  className="rounded"
                  src={faker.image.food(512, 512, consume_data)}
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="100vw"
                  alt=""
                />
                <div className="absolute top-1 left-1">
                  <Badge>{faker.datatype.number(100)} Points</Badge>
                </div>

                <div className="absolute -bottom-3 right-1">
                  <ActionIcon
                    size="lg"
                    color="grape"
                    variant="default"
                    radius="xl"
                  >
                    <IconHeart className="flex items-center" />
                  </ActionIcon>
                </div>
              </figure>

              <div className="w-full p-3">
                <p className="text-dark-300 font-bold capitalize text-sm mt-1">
                  {faker.lorem.words(2)}
                </p>

                <div className="text-dark-100 capitalize text-xs mt-[0.5]">
                  {faker.lorem.sentence()}
                </div>

                <div className="w-full mt-2 flex items-center space-x-1">
                  <Text color="orange">
                    {faker.datatype
                      .array(faker.datatype.number({ min: 1, max: 5 }))
                      .map((item) => (
                        <i className="fa-solid fa-star" key={item}></i>
                      ))}
                  </Text>
                  <span className="text-xs">
                    ({faker.datatype.number(1000)})
                  </span>
                </div>

                <div className="mt-3">
                  <Link href="">
                    <Button fullWidth variant="light">
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
