import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/ui/Header";

const MyListings: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Listings | JaxAnimals</title>
        <meta
          name="description"
          content="View all of the listings that you have created on JaxAnimals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggingIn={false} />
      <h1>All my listings</h1>
    </>
  );
};

export default MyListings;
