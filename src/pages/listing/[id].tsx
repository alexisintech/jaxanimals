import { type GetServerSideProps } from "next";
import Head from "next/head";

import { prisma } from "~/server/db";
import {
  type ListingType,
  type Listing,
  type ListingSpecies,
  type ListingSex,
} from "@prisma/client";

import Header from "~/components/ui/Header";
import UniqueListing from "~/components/ui/Listing";

export interface IListing {
  id: string;
  active: boolean;
  img: string;
  type: ListingType;
  species: ListingSpecies;
  sex: ListingSex;
  name: string | null;
  color: string[];
  markings: string | null;
  uniqueAttribute: string | null;
  location: string;
}

interface GetListingProps {
  listingData: Listing;
}

const GetListing = ({ listingData }: GetListingProps) => {
  return (
    <>
      <Head>
        <title>Listing | JaxAnimals</title>
        <meta
          name="description"
          content="Unique listing information on JaxAnimals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggingIn={false} />
      <UniqueListing listing={listingData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  listingData: IListing;
}> = async ({ query }) => {
  const listingData = await prisma.listing.findUnique({
    where: {
      id: query.id as string,
    },
    select: {
      id: true,
      active: true,
      img: true,
      type: true,
      species: true,
      sex: true,
      name: true,
      color: true,
      markings: true,
      uniqueAttribute: true,
      location: true,
    },
  });

  if (!listingData) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { listingData },
  };
};

export default GetListing;
