"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { Autocomplete, Button } from "@mantine/core";
import { IconSearch, IconLogout, IconCategory2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("recipes");
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser((initialUser) => (initialUser = localStorage.getItem("user")));
    }
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-[1000] left-0 right-0 p-2 bg-secondary w-screen lg:px-40">
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

            <div className="hidden rounded-lg bg-white md:flex justify-between w-96 h-10 my-auto">
              <div className="flex-grow justify-center pl-4">
                <Autocomplete
                  variant="unstyled"
                  radius={0}
                  placeholder="Search Recipe"
                  data={["Merchant 1"]}
                />
              </div>

              <div className="rounded-r-lg bg-blue cursor-pointer pt-1">
                <IconSearch size="2em" className="p-1" />
              </div>
            </div>

            <div className="flex items-center">
              <div className="md:hidden rounded-r-lg cursor-pointer">
                <IconSearch size="2em" className="p-1 mr-2" />
              </div>

              <div>
                {user ? (
                  <div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/${user}/saved-recipes`}>
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
                      </Link>

                      <div className="cursor-pointer">
                        <IconLogout
                          size="2.5em"
                          className="p-1 mr-2"
                          onClick={handleLogout}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="md:hidden">
                      <IconCategory2
                        className="my-auto cursor-pointer"
                        size={36}
                        onClick={toggleMenu}
                      />
                    </div>

                    <div className="hidden md:flex flex-1 items-center ml-3">
                      <div className="mr-2">
                        <Link href="/auth/login">
                          <Button variant="outline" color="blue">
                            Login
                          </Button>
                        </Link>
                      </div>

                      <div className="mr-2">
                        <Link href="/auth/register">
                          <Button variant="outline" color="green">
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showMenu ? (
            <div className="md:hidden">
              <div className="p-2">
                <div className="w-96">
                  <Link href="/auth/login" className="">
                    <Button variant="outline" color="blue" fullWidth>
                      Login
                    </Button>
                  </Link>
                </div>

                <div className="mt-2 w-96">
                  <Link href="/auth/register">
                    <Button variant="outline" color="green" fullWidth>
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
      </nav>
      <div className="mt-16"></div>
    </>
  );
};

export default TopNav;
