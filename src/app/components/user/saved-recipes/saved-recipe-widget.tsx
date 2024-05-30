"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import Link from "next/link";
import { Recipe } from "../../../recipe/recipe";

const SavedRecipeWidget = ({ recipe }: { recipe: Recipe }) => {
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
      </figure>

      <div className="w-full p-3">
        <p className="font-bold capitalize mt-1">{recipe.title}</p>
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

export default SavedRecipeWidget;
