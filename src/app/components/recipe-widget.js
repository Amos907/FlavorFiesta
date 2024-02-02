"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import { useRouter } from "next/navigation";
import { ActionIcon, Button } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

const RecipeWidget = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const consume_data = process.env.NEXT_PUBLIC_FAKER_DATA_HEAVY === "true";

  const [liked, setLiked] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser((initialUser) => (initialUser = localStorage.getItem("user")));
    }
  }, []);

  return (
    <div className="rounded-[0.3rem] border p-2">
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
          {user ? (
            <ActionIcon
              onClick={toggleLiked}
              size="lg"
              className="bg-white shadow-md"
              variant="default"
              radius="xl"
            >
              {liked ? (
                <figure className="h-6 w-6 relative cursor-pointer">
                  <Image
                    className="rounded-lg"
                    src="/images/icons/heart.svg"
                    style={{ objectFit: "cover" }}
                    fill
                    sizes="100vw"
                    alt=""
                  />
                </figure>
              ) : (
                <IconHeart className="flex items-center" />
              )}
            </ActionIcon>
          ) : (
            <ActionIcon
              onClick={() => router.push("/auth/login")}
              size="lg"
              className="bg-white shadow-md"
              variant="default"
              radius="xl"
            >
              <IconHeart className="flex items-center" />
            </ActionIcon>
          )}
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
  );
};

export default RecipeWidget;
