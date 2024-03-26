import React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import TopNav from "@/app/components/layout/top-nav";
// import { IconChevronLeft } from "@tabler/icons-react";
// import { Button } from "@mantine/core";
import SavedRecipesContainer from "@/app/components/user/saved-recipes/saved-recipes-container";

const SavedRecipes = async () => {
  // const router = useRouter();
  let userId = 0;
  const savedRecipes = [];

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     let user = localStorage.getItem("user");
  //     const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  //     setSavedRecipes(storedRecipes);

  //     if (!user) {
  //       router.push("/auth/login");
  //     }
  //   }
  // }, [router]);

  return (
    <main className="lg:px-40">
      {/* <TopNav /> */}
      <div className="m-3">
        {/* <div className="px-2 flex justify-between">
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
        </div> */}
        <SavedRecipesContainer userId={userId} />
      </div>
    </main>
  );
};

export default SavedRecipes;
