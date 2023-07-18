import Image from "next/image";
import { type Listing } from "@prisma/client";

import { Heart, MapPin, MoreHorizontal, Palette } from "lucide-react";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { Flower2 } from "lucide-react";
import { SmilePlus } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/Dialog";

const UniqueListing = ({ listing }: { listing: Listing }) => {
  console.log(listing);

  const colors = listing.color.join(", ");

  return (
    <Dialog>
      <DialogTrigger>
        <div className="container flex items-center justify-center text-foreground">
          <div className="relative mx-auto flex h-[270px] w-[216px] rounded-2xl object-cover">
            <Image
              alt="user's uploaded image of pet"
              src={listing.img}
              width={270}
              height={216}
              className="mx-auto rounded-2xl object-cover"
            />
            <div className="absolute bottom-0 flex w-full justify-between gap-2 rounded-b-2xl bg-gradient-to-b from-transparent via-neutral-900/70 to-black p-3 opacity-90">
              <p className="text-lg font-semibold">
                {listing.name || "Unknown"}
              </p>
              <Button variant="ghost" className="h-6 px-2 py-1">
                <Heart />
              </Button>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="container flex h-[90%] flex-col items-center justify-center overflow-hidden py-10 text-foreground">
        {/* pop up component */}
        <div className="flex w-full flex-col items-center overflow-y-scroll">
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
              <p className="text-xl font-bold">{listing.name || "Unknown"}</p>
              <p className="text-sm">
                {listing.type == "Lost" ? "I'm lost." : "Someone found me!"}
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
      </DialogContent>
    </Dialog>
  );
};

export default UniqueListing;
