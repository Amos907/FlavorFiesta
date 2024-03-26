"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

import { auth } from "../../../../lib/firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

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

  // const authenticateUser = ({ email, password }) => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       localStorage.setItem("user", user.email);

  //       notifications.show({
  //         title: "Success",
  //         message: "Login Successful!",
  //         color: "green",
  //       });

  //       router.push("/");
  //     })
  //     .catch((error) => {
  //       notifications.show({
  //         title: "Failed",
  //         message: error.message,
  //         color: "red",
  //       });
  //     });
  // };

  const authenticateUser = async (formData) => {
    try {
      const res = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.user) {
        notifications.show({
          title: "Success",
          message: "Login Successful!",
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
        title: "Login Failed",
        message: error.message,
        color: "red",
      });
    }
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
            onSubmit={form.onSubmit((values) => authenticateUser(values))}
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
