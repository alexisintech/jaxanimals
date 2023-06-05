import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/ui/Header";
import { BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { Button } from "~/components/ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

const LoginPage: NextPage = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <main className="container flex min-h-screen flex-col items-center justify-center px-4">
        <h1 className="text-5xl font-extrabold text-white">
          Checking authentication...
        </h1>
      </main>
    );
  }

  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "https://localhost:3000" });
  };

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
      <Header loggingIn={true} />
      <main className="text-primary-content -mt-[4rem] grid h-screen place-items-center items-center pt-20">
        <div className="container flex flex-col items-center justify-center px-4 text-white">
          <p className="mb-2 text-5xl font-extrabold">
            We currently only support Google log ins.
          </p>
          <p className="text-2xl italic opacity-70">
            We are working on adding more log in features.
          </p>
          <p className="text-2xl italic opacity-70">
            Thank you for your patience.
          </p>
          <Button
            onClick={handleLogin}
            className="mt-10 h-16 gap-2 bg-primary/70 px-16 text-2xl shadow-md shadow-foreground/20 hover:bg-primary"
          >
            <BsGoogle />
            Sign in with Google
          </Button>
        </div>
      </main>
    </>
  );
};

export default LoginPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
