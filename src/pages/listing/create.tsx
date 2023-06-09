import { useState } from "react";
import { ListingType, ListingSpecies, ListingSex } from "@prisma/client";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { z } from "zod";
import { Controller } from "react-hook-form";
import { authOptions } from "~/server/auth";

import { api } from "~/utils/api";
import { useZodForm } from "~/utils/zod-form";
import { coatColors } from "~/utils/colorOptions";
import { cn } from "~/utils/cn";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/uploadthing";

import { Button } from "~/components/ui/Button";
import Header from "~/components/ui/Header";
import { Input } from "~/components/ui/Input";
import { Separator } from "~/components/ui/Separator";
import { Label } from "~/components/ui/Label";
import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";

import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";

// Validate form with Zod
export const createListingSchema = z.object({
  img: z.string().url(),
  type: z.nativeEnum(ListingType),
  species: z.nativeEnum(ListingSpecies),
  sex: z.nativeEnum(ListingSex),
  name: z.string().optional(),
  color: z.array(z.string()),
  markings: z.string().optional(),
  uniqueAttribute: z.string().optional(),
  location: z.string().nonempty({
    message:
      "Please enter a location. It can be as simple as a zipcode, street name, or address of a nearby landmark.",
  }),
});

const CreateListing: NextPage = () => {
  const { data: session, status } = useSession();
  const [selectedColors, setSelectedColors] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  if (status === "loading") {
    // load loading component
  }

  const methods = useZodForm({
    schema: createListingSchema,
  });

  // const utils = api.useContext();
  // const updateUser = api.user.updateUser.useMutation({
  //   onSettled: async () => {
  //     await utils.user.invalidate();
  //     methods.reset();
  //   },
  // });

  // const onSubmit = methods.handleSubmit(
  //   (data) => {
  //     updateUser.mutate(data);
  //   },
  //   (e) => {
  //     console.log("And I oop- (an error occurred)");
  //     console.error(e);
  //   }
  // );

  const onSubmit = methods.handleSubmit(
    (data) => {
      console.log(data);
    },
    (e) => {
      console.log("And I oop- (an error occurred)");
      console.error(e);
    }
  );

  return (
    <>
      <Head>
        <title>Create a Listing | JaxAnimals</title>
        <meta
          name="description"
          content="Create a listing for a lost or found pet on JaxAnimals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggingIn={false} />
      <main className="container flex flex-col items-center justify-center py-20 text-foreground">
        <div className="flex w-1/2 flex-col rounded bg-background pb-20 pt-10">
          <div>
            <h2 className="px-10 pb-10 text-2xl font-extrabold">
              Create Listing
            </h2>
            <Separator className="opacity-20" />
          </div>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-5 px-10 pt-10">
              <div className="space-y-1">
                <Controller
                  control={methods.control}
                  name="img"
                  render={({ field }) => (
                    <>
                      {imageUrl ? (
                        <>
                          <Input
                            id="img"
                            value={imageUrl}
                            className="hidden"
                            {...methods.register("img")}
                          />
                          <div className="mx-auto flex h-[250px] w-[250px] rounded border border-accent/20 object-cover p-2">
                            <Image
                              alt="user's uploaded image of pet"
                              src={imageUrl}
                              width={500}
                              height={500}
                              className="mx-auto object-cover"
                            />
                          </div>
                        </>
                      ) : (
                        <UploadButton<OurFileRouter>
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);

                            if (!res || !res[0]) {
                              throw new Error("File could not be uploaded");
                            }

                            setImageUrl(res[0].fileUrl || "");

                            console.log("Upload Completed");
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            console.log(`ERROR! ${error.message}`);
                          }}
                        />
                      )}
                    </>
                  )}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.img?.message}
                </p>
              </div>

              <div className="space-y-1">
                <Label>Is your pet lost, or did you find one?</Label>
                <Controller
                  control={methods.control}
                  name="type"
                  render={({ field }) => (
                    <ShadSelect
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="italic">
                        <SelectValue placeholder="Lost or found?" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ListingType).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </ShadSelect>
                  )}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.type?.message}
                </p>
              </div>
              <div className="space-y-1">
                <Label>Do they bark, or do they meow?</Label>
                <Controller
                  control={methods.control}
                  name="species"
                  render={({ field }) => (
                    <ShadSelect
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="italic">
                        <SelectValue placeholder="Select a species" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ListingSpecies).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </ShadSelect>
                  )}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.species?.message}
                </p>
              </div>
              <div className="space-y-1">
                <Label>Are they male, female, or are you unsure?</Label>
                <Controller
                  control={methods.control}
                  name="sex"
                  render={({ field }) => (
                    <ShadSelect
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="italic">
                        <SelectValue placeholder="Select a sex" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ListingSex).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </ShadSelect>
                  )}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.sex?.message}
                </p>
              </div>
              {/* HeadlessUI ListBox here hiding among Shadcn components hehe */}
              <div className="space-y-1">
                <Label>What color is their coat?</Label>
                <Controller
                  control={methods.control}
                  name="color"
                  render={({ field: { onChange } }) => (
                    <Listbox
                      multiple
                      as="div"
                      className="space-y-1"
                      value={selectedColors}
                      onChange={(e) => {
                        onChange(e);
                        setSelectedColors(e);
                      }}
                    >
                      {({ open }) => (
                        <>
                          <div className="relative">
                            <span className="inline-block w-full rounded-md shadow-sm">
                              <Listbox.Button className="flex h-10 w-full items-center justify-between rounded border border-accent/30 bg-background px-3 py-2 text-sm ring-offset-transparent !transition-colors !duration-300 placeholder:text-muted-foreground hover:border-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background">
                                <span className="block truncate pr-2 italic">
                                  {selectedColors.length > 0
                                    ? selectedColors
                                        .map((color) => color)
                                        .join(", ")
                                    : "Select one or more colors"}
                                </span>
                                <ChevronDown className="h-4 w-4 text-accent opacity-50" />
                              </Listbox.Button>
                            </span>

                            <Transition
                              show={open}
                              enter="transition-all ease-in-out duration-500s"
                              enterFrom="opacity-0 translate-y-[-5px]"
                              enterTo="opacity-100 translate-y-0"
                              className="absolute mt-1 w-full"
                            >
                              <Listbox.Options
                                static
                                className="scrollbar-track-bg-background max-h-60 overflow-auto rounded-md border border-accent bg-background p-1 leading-6 shadow-md animate-in fade-in-80 scrollbar-thin scrollbar-thumb-accent focus:outline-none sm:text-sm sm:leading-5"
                              >
                                {coatColors.map((color) => (
                                  <Listbox.Option key={color} value={color}>
                                    {({ selected, active }) => (
                                      <div
                                        className={cn(
                                          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2",
                                          active
                                            ? "bg-accent/20 text-accent-foreground"
                                            : "text-bg-foreground",
                                          selected
                                            ? "bg-accent/20 text-accent-foreground"
                                            : "text-bg-foreground"
                                        )}
                                      >
                                        <span className={"block truncate"}>
                                          {color}
                                        </span>
                                        {selected && (
                                          <span
                                            className={`text-bg-foreground absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                          >
                                            <Check className="h-4 w-4" />
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  )}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.color?.message}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="location">Where are you located?</Label>
                <Input
                  id="location"
                  placeholder="E.g. Maple street, 32259"
                  className="placeholder:italic placeholder:text-foreground"
                  {...methods.register("location")}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.location?.message}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">
                  Do they have a name they might respond to?
                </Label>
                <Input
                  id="name"
                  placeholder="Type a name..."
                  className="placeholder:italic placeholder:text-foreground"
                  {...methods.register("name")}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.name?.message}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="markings">
                  Do they have any markings on them?
                </Label>
                <Input
                  id="markings"
                  placeholder="E.g. white spot on their right eye"
                  className="placeholder:italic placeholder:text-foreground"
                  {...methods.register("markings")}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.markings?.message}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="uniqueAttribute">
                  Do they have any unique attributes?
                </Label>
                <Input
                  id="uniqueAttribute"
                  placeholder="E.g. missing back right leg, no tail, etc."
                  className="placeholder:italic placeholder:text-foreground"
                  {...methods.register("uniqueAttribute")}
                />
                <p className="text-sm italic text-red-600">
                  {methods.formState.errors?.uniqueAttribute?.message}
                </p>
              </div>
              {/* TO-DO: get isSubmititng to work :(  */}
              <Button type="submit" className="mt-5 w-full">
                {methods.formState.isSubmitting
                  ? "Saving your changes..."
                  : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateListing;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
