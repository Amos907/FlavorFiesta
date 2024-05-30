"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { register } from "../../../../lib";

const Register = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 6) {
          return "Password must be at least 8 characters long";
        }
        return null;
      },
      confirm: (value, values) => {
        if (value !== values.password) {
          return "Passwords do not match";
        }
        return null;
      },
    },
  });

  return (
    <section className="bg-fixed h-screen relative flex justify-center items-center">
      <div className="absolute inset-0 z-10">
        <figure>
          <Image
            src="/images/backgrounds/bg.jpg"
            layout="fill"
            objectFit="cover"
            alt="Background Image"
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
            />
          </figure>
        </div>

        <div className="">
          <form
            className="space-y-2"
            onSubmit={form.onSubmit(async ({ email, password }) => {
              try {
                const data = await register({ email, password });
                if (data.user) {
                  notifications.show({
                    title: "Success",
                    message: "User registration successful!",
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
                  message: "User registration failed!",
                  color: "red",
                });
              }
            })}
          >
            <TextInput
              withAsterisk
              placeholder="email@email.com"
              label="Email"
              {...form.getInputProps("email")}
            />

            <p className="text-red-500 text-xs">{emailError}</p>

            <PasswordInput
              withAsterisk
              placeholder="Password"
              label="Password"
              {...form.getInputProps("password")}
            />

            <p className="text-red-500 text-xs">{passwordError}</p>

            <PasswordInput
              withAsterisk
              placeholder="Confirm Password"
              label="Confirm Password"
              {...form.getInputProps("confirm")}
            />

            <div className="flex">
              <Button
                className="flex-1 text-white"
                type="submit"
                color="blue"
                variant="outline"
              >
                Register
              </Button>
            </div>
          </form>

          <div className="flex justify-center my-3 items-center">
            <p className="text-white">Already have an account? </p>
            <div className="cursor-pointer">
              <Link href="/auth/login">
                <p className="font-semibold underlined ml-1"> Sign in</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
