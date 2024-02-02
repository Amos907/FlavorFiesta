"use client";

import React from "react";
import Image from "next/image";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { auth } from "../../../../lib/firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 8) {
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

  const registerUser = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", user.email);

        notifications.show({
          title: "Success",
          message: "Account Creation Successful!",
          color: "green",
        });

        router.push("/");
      })
      .catch((error) => {
        notifications.show({
          title: "Failed",
          message: error.message,
          color: "red",
        });
      });
  };

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
            onSubmit={form.onSubmit((values) => registerUser(values))}
          >
            <TextInput
              withAsterisk
              placeholder="email@email.com"
              label="Email"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              withAsterisk
              placeholder="Password"
              label="Password"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              placeholder="Confirm Password"
              label="Confirm Password"
              {...form.getInputProps("confirm")}
            />

            <div className="flex">
              <Button
                className="flex-1"
                type="submit"
                color="black"
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