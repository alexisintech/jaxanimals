import Image from "next/image";
import { MapPin, Palette } from "lucide-react";
import { IoMaleFemaleOutline } from "react-icons/io5";

import { type IListing } from "~/pages/listing/[id]";
import { Flower2 } from "lucide-react";
import { SmilePlus } from "lucide-react";

interface ListingProps {
  listing: IListing;
}

const UniqueListing = (props: ListingProps) => {
  const listing = props.listing;
  console.log(listing);

  const colors = listing.color.join(", ");

  return (
    // pop up component
    <div className="container flex flex-col items-center justify-center py-20 text-foreground">
      <div className="flex rounded bg-background px-10 py-10">
        <div className="flex w-[250px] flex-col gap-4">
          <div className="mx-auto flex h-[250px] w-[250px] object-cover">
            <Image
              alt="user's uploaded image of pet"
              src={listing.img}
              width={500}
              height={500}
              className="mx-auto rounded-md object-cover"
            />
          </div>
          <div>
            <p className="text-xl font-bold">Hi, I'm {listing.name}!</p>
            <p className="flex-wrap text-sm">
              {listing.type == "Lost" ? "I'm lost." : "Someone found me!"} Could
              you help me find my home?
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex h-[25px] w-[25px] items-center rounded bg-accent/30 object-cover p-1">
              <IoMaleFemaleOutline className="text-accent" />
            </div>
            {listing.sex == "Female" ? <p>Female</p> : <p>Male</p>}
          </div>
          <div className="flex gap-2">
            <div className="flex h-[25px] w-[25px] items-center rounded bg-accent/30 object-cover p-1">
              <MapPin className="text-accent" />
            </div>
            <p>{listing.location}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex h-[25px] w-[25px] items-center rounded bg-accent/30 object-cover p-1">
              <Palette className="text-accent" />
            </div>
            <p>{colors}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex h-[25px] w-[25px] items-center rounded bg-accent/30 object-cover p-1">
              <Flower2 className="text-accent" />
            </div>
            <p>{listing.uniqueAttribute}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex h-[25px] w-[25px] items-center rounded bg-accent/30 object-cover p-1">
              <SmilePlus className="text-accent" />
            </div>
            <p>{listing.markings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueListing;
