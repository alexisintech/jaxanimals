import { type NextPage } from "next";
import Head from "next/head";
import { Controller } from "react-hook-form";
import { z } from "zod";

import { useZodForm } from "~/utils/zod-form";
import { Input } from "~/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { Header } from "~/components/ui/Header";
import { Button } from "~/components/ui/Button";
import Link from "next/link";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | JaxAnimals</title>
        <meta
          name="description"
          content="Browse listings of the lost and found pets of Jacksonville, FL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="text-primary-content -mt-[4rem] grid h-screen place-items-center items-center bg-gradient-to-br from-primary to-secondary pt-20">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              console.log("hi");
            }}
          >
            <div className="space-y-1">
              <Input
                id="username"
                placeholder="Username"
                // {...methods.register("title")}
              />
              <p className="font-medium text-red-500">error</p>
            </div>
            <div className="space-y-1">
              <Input
                id="email"
                placeholder="Email address"
                // {...methods.register("title")}
              />
              <p className="font-medium text-red-500">error</p>
            </div>
            <div className="space-y-1">
              <Input
                id="password"
                placeholder="Password"
                // {...methods.register("body")}
              />
              <p className="font-medium text-red-500">error</p>
            </div>
            <div className="space-y-1">
              <Input
                id="confirm"
                placeholder="Confirm password"
                // {...methods.register("body")}
              />
              <p className="font-medium text-red-500">error</p>
            </div>
            <Button type="submit">Sign up</Button>
            <div>
              <p>Already have an account?</p>
              <Link href="login">Login</Link>
            </div>
            <p className="font-medium text-red-500">error</p>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
