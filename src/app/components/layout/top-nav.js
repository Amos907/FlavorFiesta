import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const TopNav = () => {
  return (
    <>
      <nav className="fixed top-0 z-[1000] left-0 right-0 m-4">
        <section className="">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <figure className="md:hidden relative cursor-pointer">
                    <Image
                      className="rounded-lg"
                      src="/images/logos/logo.png"
                      style={{ objectFit: "cover" }}
                      width={150}
                      height={150}
                      alt=""
                    />
                  </figure>

                  <figure className="hidden md:block relative cursor-pointer">
                    <Image
                      className="rounded-lg"
                      src="/images/logos/logo.png"
                      style={{ objectFit: "cover" }}
                      height={170}
                      width={170}
                      alt=""
                    />
                  </figure>
                </div>
              </Link>
            </div>
            <div className="flex">
              <div className="rounded-r-lg cursor-pointer">
                <IconSearch size="2em" className="p-1 mr-2" />
              </div>

              <figure className="h-7 w-7 relative cursor-pointer">
                <Image
                  className="rounded-lg"
                  src="/images/icons/heart.svg"
                  style={{ objectFit: "cover" }}
                  fill
                  sizes="100vw"
                  alt=""
                />
              </figure>
            </div>
          </div>
        </section>
      </nav>
      <div className="mt-16"></div>
    </>
  );
};

export default TopNav;
