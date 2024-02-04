"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionIcon, Button } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { cleanUpText } from "../../../utils/cleaupResponse";

const RecipeWidget = ({ recipe }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
          src={recipe.image}
          style={{ objectFit: "cover" }}
          fill
          sizes="100vw"
          alt=""
        />
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
        <p className="text-lg font-bold capitalize mt-1">{recipe.title}</p>

        <div className="text-gray-700 font-sans capitalize text-sm mt-[0.5] h-10 overflow-hidden">
          <p>{cleanUpText(recipe.summary)}</p>
        </div>

        <div className="pt-3">
          <Link href={`/recipe/${recipe.id}`}>
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
