import { GetServerSidePropsContext, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/Button";
import Header from "~/components/ui/Header";
import { Input } from "~/components/ui/Input";
import { Separator } from "~/components/ui/Separator";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

// TO-DO: Add a form to update user info

const Settings: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // load loading component
  }

  const id = useRouter().query.id as string;
  const { data: user } = api.example.getUser.useQuery({ id });

  const userInfo = [
    {
      title: "Name",
      info: user?.name || "",
    },
    {
      title: "Email",
      info: user?.email || "",
    },
    {
      title: "Phone",
      info: user?.phone || "",
    },
    {
      title: "Facebook",
      info: user?.facebook || "",
    },
    {
      title: "Instagram",
      info: user?.instagram || "",
    },
  ];

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
      <main className="container flex flex-col items-center justify-center py-20 text-white">
        <div className="glassmorphism flex w-1/2 flex-col rounded border border-background/20 bg-background/25 pb-20 pt-10">
          <div className="pb-5">
            <h2 className="px-10 pb-5 text-2xl font-extrabold">Profile</h2>
            <Separator className="opacity-20" />
          </div>

          <div className="flex flex-col gap-5 px-10 pt-10">
            {userInfo.map((data, index) => (
              <div key={index}>
                <label htmlFor={data.title} className="text-xl font-extrabold">
                  {data.title}
                </label>
                {data.title === "Name" ? (
                  <Input
                    disabled
                    className="cursor-text rounded border-solid border-background/30 bg-transparent text-2xl font-light !transition-colors !duration-300 hover:border-background/70 disabled:border-background/20 disabled:hover:bg-transparent"
                    value={data.info}
                    name={data.title}
                  />
                ) : data.title === "Email" ? (
                  <Input
                    disabled
                    className="cursor-text rounded border-solid border-background/30 bg-transparent text-2xl font-light !transition-colors !duration-300 hover:border-background/70 disabled:border-background/20 disabled:hover:bg-transparent"
                    value={data.info}
                    name={data.title}
                  />
                ) : (
                  <Input
                    className="cursor-text rounded border-solid border-background/30 bg-transparent text-2xl font-light !transition-colors !duration-300 hover:border-background/70 disabled:border-background/20 disabled:hover:bg-transparent"
                    value={data.info}
                    name={data.title}
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="mt-10 w-full">
              Save
            </Button>
          </div>
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
