import React from "react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import { IconStarFilled } from "@tabler/icons-react";

import TopNav from "@/app/components/layout/top-nav";
import { Button } from "@mantine/core";

const Recipe = () => {
  const consume_data = process.env.NEXT_PUBLIC_FAKER_DATA_HEAVY === "true";

  return (
    <main className="lg:px-40">
      <TopNav />
      <div className="m-3">
        <div className="flex flex-col-reverse justify-center md:flex-row md:items-center md:pt-6 md:pb-6 md:p-2 md:bg-light-200 rounded-lg lg:shadow-sm">
          <div className="px-2 flex flex-col md:flex-1">
            <div className="md:flex justify-between">
              <h2 className="text-3xl md:ml-2 font-bold text-primary">
                {faker.lorem.word()}
              </h2>
            </div>

            <p className="mt-1 text-gray-700 font-serif text-lg">
              {faker.lorem.sentences(2)}
            </p>

            <div className="grid grid-cols-3 py-3 divide-x">
              <div className="text-center space-y-1">
                <p className="text-gray-600 text-4xl font-sans">
                  {faker.datatype.number(15)}
                </p>
                <p className="text-gray-600 font-sans">Ingredients</p>
              </div>

              <div className="text-center space-y-1">
                <p className="text-gray-600 text-4xl font-sans">
                  {faker.datatype.number(15)}
                </p>
                <p className="text-gray-600 font-sans">Minutes</p>
              </div>

              <div className="text-center space-y-1">
                <p className="text-gray-600 text-4xl font-sans">
                  {faker.datatype.number(15)}
                </p>
                <p className="text-gray-600 font-sans">Calories</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="pt-2">
                <p className="font-sans text-lg font-bold text-primary">
                  Dish Types
                </p>
                <div className="space-y-2">
                  {faker.datatype.array(3).map((item) => (
                    <p key={item} className="text-gray-700 font-sans">
                      {faker.lorem.words(2)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="font-sans text-lg font-bold text-primary">
                  Wine Parings
                </p>
                <div className="space-y-2">
                  {faker.datatype.array(3).map((item) => (
                    <p key={item} className="text-gray-700 font-sans">
                      {faker.lorem.words(2)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <Button color="blue" variant="outline" fullWidth className="mt-4">
              Save
            </Button>
          </div>

          <div className="w-full py-auto mb-4 md:w-1/2">
            <figure className="h-80 mt-1 w-full relative cursor-pointer md:h-80 shadow-lg rounded-lg">
              <Image
                className="rounded-lg"
                src={faker.image.food(512, 512, consume_data)}
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
              {faker.datatype.array(6).map((item) => (
                <p key={item} className="text-gray-700 font-sans">
                  {faker.lorem.sentences(1)}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:my-auto text-center">
            <p className="text-2xl font-bold pt-4 font-sans text-primary">
              Nutrition
            </p>
            <div className="no-scrollbar flex overflow-x-auto space-x-3 justify-center">
              {faker.datatype.array(6).map((item) => (
                <div key={item} className="">
                  <figure className="bg-gray-200 h-20 w-20 rounded-full"></figure>
                </div>
              ))}

              {/* <div className="hidden md:flex md:space-x-8">
                <div>
                  {faker.datatype.array(3).map((item) => (
                    <div key={item} className="">
                      <figure className="bg-gray-200 h-20 w-20 rounded-full"></figure>
                    </div>
                  ))}
                </div>

                <div>
                  {faker.datatype.array(3).map((item) => (
                    <div key={item} className="">
                      <figure className="bg-gray-200 h-20 w-20 rounded-full"></figure>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="">
          <div>
            <h1 className="p-3 px-0 text-xl font-bold capitalize text-primary">
              You may also like
            </h1>
            <div className="no-scrollbar flex overflow-x-scroll">
              {faker.datatype.array(15).map((item) => (
                <div className="" key={item}>
                  <figure className="h-48 ml-2 mt-1 w-48 relative cursor-pointer">
                    <Link href="">
                      <Image
                        className="rounded-lg "
                        src={faker.image.food(512, 512, consume_data)}
                        style={{ objectFit: "cover" }}
                        fill
                        sizes="100vw"
                        alt=""
                      />
                    </Link>
                  </figure>

                  <div className="py-2 space-y-2">
                    <div className="">
                      <p className="font-sans text-gray-600">
                        {faker.lorem.sentence(2)}
                      </p>
                    </div>

                    <div className="">
                      <div className="flex items-center">
                        {faker.datatype.array(4).map((item) => (
                          <IconStarFilled
                            key={item}
                            size={18}
                            style={{ color: "yellow" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Recipe;
