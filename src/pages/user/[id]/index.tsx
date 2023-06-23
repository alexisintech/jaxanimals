import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as z from "zod";
import { authOptions } from "~/server/auth";

import { api } from "~/utils/api";
import { cn } from "~/utils/cn";
import { useZodForm } from "~/utils/zod-form";
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { prisma } from "~/server/db";
import { User } from "@prisma/client";

// TO-DO: try phone .regex(^[0-9]+$)
export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z
    .string()
    .length(10, {
      message:
        "Phone numbers must have no symbols or spaces and must include the area code.",
    })
    .optional(),
  facebook: z
    .string()
    .url({
      message:
        "Please enter a valid URL. If you do not have a Facebook account, leave this field blank.",
    })
    .optional(),
  instagram: z
    .string()
    .url({
      message:
        "Please enter a valid URL. If you do not have an Instagram account, leave this field blank.",
    })
    .optional(),
});

export default function Settings({ userData }: { userData: User }) {
  const [update, setUpdate] = useState({
    updating: false,
    saved: false,
    error: false,
  });
  const { status } = useSession();

  if (status === "loading") {
    // load loading component
  }

  const id = useRouter().query.id as string;
  const { data: user } = api.user.getUserById.useQuery({ id });

  const methods = useZodForm({
    schema: updateUserSchema,
    defaultValues: {
      id: userData.id,
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      facebook: userData.facebook || "",
      instagram: userData.instagram || "",
    },
  });

  const utils = api.useContext();
  const updateUser = api.user.updateUser.useMutation({
    onSettled: async () => {
      await utils.user.invalidate();
      methods.reset();
      setUpdate({
        updating: false,
        saved: true,
        error: false,
      });
    },
    onError: (e) => {
      console.log(
        "And I oop- (error occurred while updating the user settings)"
      );
      console.error(e);
      setUpdate((prev) => ({
        ...prev,
        error: true,
      }));
    },
  });

  const onSubmit = methods.handleSubmit(
    (data) => {
      setUpdate((prev) => ({
        ...prev,
        updating: true,
      }));
      // updateUser.mutate(data);
      console.log(data);
    },
    (e) => {
      console.log("And I oop- (error occurred while submitting the form)");
      console.error(e);
    }
  );

  return (
    <>
      <Head>
        <title>Settings | JaxAnimals</title>
        <meta
          name="description"
          content="Update your profile settings for JaxAnimals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggingIn={false} />
      <main className="container flex flex-col items-center justify-center py-20 text-foreground">
        <div className="flex w-1/2 flex-col rounded border border-background/20 bg-background pb-20 pt-10">
          <div>
            <h2 className="px-10 pb-10 text-2xl font-extrabold">Settings</h2>
            <Separator className="opacity-20" />
          </div>

          <Form {...methods}>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-5 px-10 pt-10">
                <div>
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input disabled {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="E.g. 9045550123"
                            maxLength={10}
                            className={cn(
                              methods.formState.errors.phone &&
                                "border-red-600 hover:border-red-600 focus:ring-0",
                              "placeholder:text-foreground"
                            )}
                          />
                        </FormControl>
                        <FormDescription
                          className={cn(
                            methods.formState.errors.phone && "text-red-600",
                            "italic opacity-50"
                          )}
                        >
                          Phone numbers must have no symbols or spaces and must
                          include the area code.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="E.g. https://facebook.com/example"
                            className={cn(
                              methods.formState.errors.facebook &&
                                "border-red-600 hover:border-red-600 focus:ring-0",
                              "placeholder:text-foreground"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="italic" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="E.g. https://instagram.com/example"
                            className={cn(
                              methods.formState.errors.instagram &&
                                "border-red-600 hover:border-red-600 focus:ring-0",
                              "placeholder:text-foreground"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="italic" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className={cn(update.saved && "bg-green-600", "mt-5 w-full")}
                  disabled={update.updating || update.saved}
                >
                  {update.updating && !update.saved ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : update.saved ? (
                    "Saved"
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}

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

  const userData = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!userData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session, userData },
  };
}
