import { ListingType, ListingSpecies, ListingSex } from "@prisma/client";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { z } from "zod";
import { authOptions } from "~/server/auth";

import { api } from "~/utils/api";
import { useZodForm } from "~/utils/zod-form";
import { cn } from "~/utils/cn";
import { Button } from "~/components/ui/Button";
import Header from "~/components/ui/Header";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Input } from "~/components/ui/Input";
import { Separator } from "~/components/ui/Separator";
import { Label } from "~/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { coatColors } from "~/utils/coatColors";
import SelectDemo from "~/components/ui/SelectRadix";

// TO-DO: enum ListingColors array of coat colors

export const createListingSchema = z.object({
  // img: z.string().url(),
  type: z.nativeEnum(ListingType),
  species: z.nativeEnum(ListingSpecies),
  sex: z.nativeEnum(ListingSex),
  name: z.string().optional(),
  color: z.string(),
  // markings: z.string().optional(),
  // uniqueAttribute: z.string().optional(),
  // location: z.string(),
});

const CreateListing: NextPage = () => {
  const { data: session, status } = useSession();

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

          <Form {...methods}>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-5 px-10 pt-10">
                <div>
                  <FormField
                    control={methods.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Is your pet lost, or did you find one?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                methods.formState.errors.type &&
                                  "border-red-600"
                              )}
                            >
                              <SelectValue placeholder="Lost or found..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(ListingType).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do they bark or do they meow?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                methods.formState.errors.species &&
                                  "border-red-600"
                              )}
                            >
                              <SelectValue placeholder="Choose a species..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(ListingSpecies).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Are they male, female, or are you unsure?
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                methods.formState.errors.sex && "border-red-600"
                              )}
                            >
                              <SelectValue placeholder="Choose a sex..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(ListingSex).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Do they have a name they might respond to?
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Type a name..."
                            className={cn(
                              methods.formState.errors.name &&
                                "border-red-600 hover:border-red-600 focus:ring-0",
                              "placeholder:text-foreground"
                            )}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What color is their coat?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                methods.formState.errors.species &&
                                  "border-red-600"
                              )}
                            >
                              <SelectValue placeholder="Choose one or more colors..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="item-aligned">
                            {coatColors.map((value, key) => (
                              <SelectItem key={key} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* TO-DO: get isSubmititng to work :(  */}
                <Button type="submit" className="mt-5 w-full">
                  {methods.formState.isSubmitting
                    ? "Saving your changes..."
                    : "Save"}
                </Button>
              </div>
            </form>
          </Form>
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
