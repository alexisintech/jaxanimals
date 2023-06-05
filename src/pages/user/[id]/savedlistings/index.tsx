import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/ui/Header";

const SavedListings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Saved Listings | JaxAnimals</title>
        <meta
          name="description"
          content="View all of the listings that you have saved on JaxAnimals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggingIn={false} />
      <h1>My saved listings</h1>
    </>
  );
};

export default SavedListings;
