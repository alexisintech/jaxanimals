import { type GetServerSidePropsContext, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authOptions } from "~/server/auth";

import { api } from "~/utils/api";
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

// TO-DO: try phone .regex(^[0-9]+$)
export const updateUserSchema = z.object({
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

const Settings: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // load loading component
  }

  const id = useRouter().query.id as string;
  const { data: user } = api.user.getUserById.useQuery({ id });

  const methods = useZodForm({
    schema: updateUserSchema,
  });

  const utils = api.useContext();
  const updateUser = api.user.updateUser.useMutation({
    onSettled: async () => {
      await utils.user.invalidate();
      methods.reset();
    },
  });

  const onSubmit = methods.handleSubmit(
    (data) => {
      updateUser.mutate(data);
    },
    (e) => {
      console.log("And I oop- (an error occurred)");
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
            <h2 className="px-10 pb-10 text-2xl font-extrabold">Profile</h2>
            <Separator className="opacity-20" />
          </div>

          <Form {...methods}>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-5 px-10 pt-10">
                <div className="space-y-1">
                  <Label htmlFor="Name" className="text-xl font-extrabold">
                    Name
                  </Label>
                  <Input
                    disabled
                    value={user?.name || ""}
                    name={user?.name || ""}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="Email" className="text-xl font-extrabold ">
                    Email
                  </Label>
                  <Input
                    disabled
                    value={user?.email || ""}
                    name={user?.email || ""}
                  />
                </div>
                <div>
                  <FormField
                    control={methods.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-extrabold">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={user?.phone || ""}
                            maxLength={10}
                            className="placeholder:text-foreground"
                          />
                        </FormControl>
                        <FormDescription className="italic opacity-50">
                          Phone numbers must have no symbols or spaces and must
                          include the area code.
                        </FormDescription>
                        <FormMessage />
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
                        <FormLabel className="text-xl font-extrabold">
                          Facebook
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={user?.facebook || ""}
                            className="placeholder:text-foreground"
                          />
                        </FormControl>
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
                        <FormLabel className="text-xl font-extrabold">
                          Instagram
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={user?.instagram || ""}
                            className="placeholder:text-foreground"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="mt-5 w-full">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
};

export default Settings;

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
