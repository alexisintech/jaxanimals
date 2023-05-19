import { type NextPage } from "next";
import Head from "next/head";

import { Header } from "~/components/ui/Header";
import { Hero } from "~/components/index/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>JaxAnimals</title>
        <meta
          name="description"
          content="Browse listings of the lost and found pets of Jacksonville, FL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
    </>
  );
};

export default Home;
