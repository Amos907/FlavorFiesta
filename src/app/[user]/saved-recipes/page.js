"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const SavedRecipes = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = localStorage.getItem("user");

      if (!user) {
        router.push("/auth/login");
      }
    }
  });

  return <div>SavedRecipes</div>;
};

export default SavedRecipes;
