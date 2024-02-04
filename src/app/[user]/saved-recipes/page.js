"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import TopNav from "@/app/components/layout/top-nav";
import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@mantine/core";

const SavedRecipes = () => {
  const router = useRouter();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = localStorage.getItem("user");
      const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      setSavedRecipes(storedRecipes);

      if (!user) {
        router.push("/auth/login");
      }
    }
  }, [router]);

  return (
    <main className="lg:px-40">
      <TopNav />
      <div className="m-3">
        <div className="px-2 flex justify-between">
          <p className="text-xl font-sans text-primary font-bold">
            Saved Recipes
          </p>
          <Button
            className=""
            size="xs"
            variant="outline"
            leftIcon={<IconChevronLeft />}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
        {savedRecipes.length > 0 ? (
          <div className="space-y-2 md:grid grid-cols-3 lg:grid-cols-4 gap-4">
            {savedRecipes.map((recipe) => (
              <div className="rounded-[0.3rem] border p-2" key={recipe.id}>
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
                  <p className="font-bold capitalize mt-1">{recipe.name}</p>
                  <div className="pt-3">
                    <Link href={`/recipe/${recipe.id}`}>
                      <Button fullWidth variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved recipes yet.</p>
        )}
      </div>
    </main>
  );
};

export default SavedRecipes;
