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
import { coatColors } from "~/utils/coatColors";
import { cn } from "~/utils/cn";

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

// Validate form with Zod
export const createListingSchema = z.object({
  // img: z.string().url(),
  type: z.nativeEnum(ListingType),
  species: z.nativeEnum(ListingSpecies),
  sex: z.nativeEnum(ListingSex),
  name: z.string().optional(),
  color: z.array(z.string()).optional(),
  // markings: z.string().optional(),
  // uniqueAttribute: z.string().optional(),
  // location: z.string(),
});

// Stupid react-select shit
import Select, { components, type DropdownIndicatorProps } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const controlStyles = {
  base: "flex align-center h-10 border border-accent/30 bg-background text-sm !transition-colors !duration-300 hover:border-accent dark:bg-background rounded",
  focus: "ring-1 ring-ring outline-none  hover:border-accent",
  nonFocus: "border-accent/30 hover:border-accent",
};
const selectInputStyles =
  "!hover:outline-none !hover:border-none !focus:outline-none !focus:border-none placeholder:text-muted-foreground";
const placeholderStyles = "text-muted-foreground";
const valueContainerStyles = "px-3 py-2 h-10 gap-1";
const multiValueStyles =
  "bg-accent/30 text-sm rounded items-center m-[2px] flex";
const multiValueLabelStyles = "p-[3px] pl-[6px]";
const multiValueRemoveStyles =
  "flex align-center hover:bg-red-400 hover:text-red-800 text-muted-foreground px-1";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
  "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "display:none";
const dropdownIndicatorStyles = "text-accent/30";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-gray-100 active:bg-gray-200",
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";
//"h-10 border border-accent/30 bg-background px-3 py-2 text-sm ring-offset-transparent !transition-colors !duration-300 placeholder:text-muted-foreground hover:border-accent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background"

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

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-5 px-10 pt-10">
              <div>
                <Label>Is your pet lost, or did you find one?</Label>
                <Controller
                  control={methods.control}
                  name="type"
                  render={({ field }) => (
                    <ShadSelect
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className={cn(
                          methods.formState.errors.type && "border-red-600"
                        )}
                      >
                        <SelectValue placeholder="Lost or found..." />
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

                <p className="italic text-red-600">
                  {methods.formState.errors?.type?.message}
                </p>
              </div>
              <div>
                <Label>Do they bark, or do they meow?</Label>
                <Controller
                  control={methods.control}
                  name="species"
                  render={({ field }) => (
                    <ShadSelect
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className={cn(
                          methods.formState.errors.type && "border-red-600"
                        )}
                      >
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

                <p className="italic text-red-600">
                  {methods.formState.errors?.species?.message}
                </p>
              </div>
              <div>
                <Label>Are they male, female, or are you unsure?</Label>
                <Controller
                  control={methods.control}
                  name="sex"
                  render={({ field }) => (
                    <ShadSelect
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className={cn(
                          methods.formState.errors.type && "border-red-600"
                        )}
                      >
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

                <p className="italic text-red-600">
                  {methods.formState.errors?.sex?.message}
                </p>
              </div>
              <div>
                <Label htmlFor="name">
                  Do they have a name they might respond to?
                </Label>
                <Input
                  id="name"
                  placeholder="Type a name..."
                  className={cn(
                    methods.formState.errors.name &&
                      "border-red-600 hover:border-red-600 focus:ring-0",
                    "placeholder:text-foreground"
                  )}
                  {...methods.register("name")}
                />
                <p className="italic text-red-600">
                  {methods.formState.errors?.name?.message}
                </p>
              </div>
              <div>
                <Label>What color is their coat?</Label>
                <Controller
                  control={methods.control}
                  name="color"
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      isMulti
                      ref={ref}
                      name={name}
                      options={coatColors}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={coatColors.filter((el) =>
                        value?.includes(el.value)
                      )}
                      onChange={(val) => onChange(val.map((c) => c.value))}
                      classNamePrefix="react-select"
                      unstyled
                      styles={{
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        }),
                        // On mobile, the label will truncate automatically, so we want to
                        // override that behaviour.
                        multiValueLabel: (base) => ({
                          ...base,
                          whiteSpace: "normal",
                          overflow: "visible",
                        }),
                        control: (base) => ({
                          ...base,
                          transition: "none",
                        }),
                      }}
                      classNames={{
                        control: ({ isFocused }) =>
                          cn(
                            isFocused
                              ? controlStyles.focus
                              : controlStyles.nonFocus,
                            controlStyles.base
                          ),
                        placeholder: () => placeholderStyles,
                        input: () => selectInputStyles,
                        valueContainer: () => valueContainerStyles,
                        multiValue: () => multiValueStyles,
                        multiValueLabel: () => multiValueLabelStyles,
                        multiValueRemove: () =>
                          cn(multiValueRemoveStyles, multiValueRemoveStyles),
                        indicatorsContainer: () => indicatorsContainerStyles,
                        clearIndicator: () => clearIndicatorStyles,
                        indicatorSeparator: () => indicatorSeparatorStyles,
                        dropdownIndicator: () => dropdownIndicatorStyles,
                        menu: () => menuStyles,
                        groupHeading: () => groupHeadingStyles,
                        option: ({ isFocused, isSelected }) =>
                          cn(
                            isFocused && optionStyles.focus,
                            isSelected && optionStyles.selected,
                            optionStyles.base
                          ),
                        noOptionsMessage: () => noOptionsMessageStyles,
                      }}
                    />
                  )}
                />
                <p className="italic text-red-600">
                  {methods.formState.errors?.color?.message}
                </p>
              </div>
              <div>
                <Label>What color is their coat?</Label>
                <Controller
                  control={methods.control}
                  name="color"
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      isMulti
                      ref={ref}
                      name={name}
                      options={coatColors}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={coatColors.filter((el) =>
                        value?.includes(el.value)
                      )}
                      onChange={(val) => onChange(val.map((c) => c.value))}
                      classNamePrefix="react-select2"
                    />
                  )}
                />
                <p className="italic text-red-600">
                  {methods.formState.errors?.color?.message}
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
