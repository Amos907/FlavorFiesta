"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { faker } from "@faker-js/faker";

export function HorizScrollContainer({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollPosition = container.scrollLeft;
      const screenWidth = window.innerWidth;

      let scrollAmount = 390; // Default scroll amount

      if (screenWidth <= 768) {
        // For small screens, reduce the scroll amount
        scrollAmount = 330;
      }

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
      className="scroll-container flex overflow-x-auto pb-3 space-x-2"
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="section-card">
          {child}
        </div>
      ))}
    </div>
  );
}

export function FlierCard() {
  const consume_data = process.env.NEXT_PUBLIC_FAKER_DATA_HEAVY === "true";

  return (
    <div className="h-80 rounded p-1 flex flex-col justify-between w-80 lg:w-96 lg:h-96">
      <div className="relative h-80 lg:h-96 w-80 lg:w-96">
        <div className="static">
          <div>
            <figure>
              <Image
                className="rounded border-none"
                src={faker.image.technics(512, 512, consume_data)}
                fill
                sizes="100vw"
                alt=""
              />
            </figure>
          </div>

          {/* <div className="p-4 flex flex-col justify-between text-start absolute top-28 left-2 bg-primary bg-opacity-40 rounded-lg w-56">
            <p className="text-white text-base md:text-2xl font-bold">
              {campaign.name}
            </p>

            <p className="text-white py-1">{campaign.description}</p>
            <div className="flex mt-4 md:mt-0">
              <Link href={`/merchant/${campaign.merchant_id}/bookings`}>
                <Button size="sm" variant="white">
                  Book Now
                </Button>
              </Link>
              <div className="ml-2">
                <Link href={`/merchant/${campaign.merchant_id}/products`}>
                  <Button size="sm">Order</Button>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
