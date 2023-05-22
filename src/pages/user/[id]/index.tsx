import { GetServerSidePropsContext, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "~/components/ui/Header";
import { Input } from "~/components/ui/Input";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

const Settings: NextPage = () => {
  const { data: session, status } = useSession();
  const id = useRouter().query.id as string;

  if (status === "loading") {
  }

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
      <main className="container flex flex-col items-center justify-center py-20">
        <div className="bg-blur-sm flex flex-col rounded border-solid bg-background px-10 py-20 shadow-sm">
          {userInfo.map((data, index) => {
            return (
              <div key={index}>
                <label
                  htmlFor={data.title}
                  className="text-xl font-extrabold text-primary"
                >
                  {data.title}
                </label>
                <Input
                  className="cursor-text rounded border border-solid bg-primary/20 text-2xl font-light !transition-colors !duration-300 hover:bg-primary/30 dark:border-primary/20 dark:bg-primary/10 dark:hover:border-primary/50"
                  value={data.info}
                  name={data.title}
                />
              </div>
            );
          })}
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
