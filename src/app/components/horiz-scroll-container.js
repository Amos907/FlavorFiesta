"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import Link from "next/link";

export function HorizScrollContainer({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollPosition = container.scrollLeft;

      let scrollAmount = 100;

      if (scrollPosition >= scrollWidth) {
        // When reached the end, reset to the beginning with a slight delay
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }, 1000);
      } else {
        // Scroll to the right with a slight delay using the determined scrollAmount
        setTimeout(() => {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }, 1000);
      }
    };

    // Start scrolling the container immediately
    const scrollInterval = setInterval(handleScroll, 3000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar flex overflow-x-auto pb-3 space-x-2"
    >
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
}

export function FlierCard({ recipe }) {
  return (
    <div className=" bg-white rounded-md shadow-sm p-2 border">
      <div className="relative h-48 w-48 lg:h-56 lg:w-52">
        <div className="static">
          <div>
            <figure>
              <Image
                className="rounded border-none"
                src={recipe.image}
                fill
                sizes="100vw"
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="max-h-20">
          <p className="font-sans">{recipe.title}</p>
        </div>

        <Link href={`/recipe/${recipe.id}`} className="pt-2">
          <Button size="sm" variant="outline">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
