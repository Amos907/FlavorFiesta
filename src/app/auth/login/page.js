"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

import { login } from "../../../../lib";

const Login = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <section className="bg-fixed h-screen relative flex justify-center items-center">
      <div className="absolute inset-0 z-10">
        <figure>
          <Image
            src="/images/backgrounds/bg.jpg"
            fill
            alt="Background Image"
            priority
          />
        </figure>
      </div>
      <div className="bg-light-100 px-4 mx-2 rounded-lg w-full relative z-20 md:w-3/5 md:px-4 lg:w-1/3 lg:px-6">
        <div className="flex justify-center my-4">
          <figure className="relative cursor-pointer">
            <Image
              className="rounded-lg"
              src="/images/logos/logo.png"
              style={{ objectFit: "cover" }}
              width={150}
              height={150}
              alt=""
              priority
            />
          </figure>
        </div>

        <div className="">
          <form
            className="space-y-2"
            onSubmit={form.onSubmit(async (formData) => {
              try {
                const data = await login(formData);
                if (data.user) {
                  notifications.show({
                    title: "Success",
                    message: "User login successful!",
                    color: "green",
                  });

                  router.push("/");
                }

                if (data.errors) {
                  setEmailError(data.errors.email);
                  setPasswordError(data.errors.password);
                }
              } catch (err) {
                notifications.show({
                  title: "Failed",
                  message: err.message,
                  color: "red",
                });
              }
            })}
          >
            <TextInput
              label="Email"
              placeholder="email@email.com"
              {...form.getInputProps("email")}
            />

            <p className="text-red-500 text-xs">{emailError}</p>

            <PasswordInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />

            <p className="text-red-500 text-xs">{passwordError}</p>

            <div className="flex">
              <Button
                className="flex-1 text-white"
                type="submit"
                variant="outline"
                color="blue"
              >
                Log in
              </Button>
            </div>
          </form>

          <div className="flex justify-center my-3 items-center">
            <p className="text-white">{"Don't have an account yet?"} </p>
            <div className="cursor-pointer">
              <Link href="/auth/register">
                <p className="font-semibold underlined ml-1"> Sign up</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
