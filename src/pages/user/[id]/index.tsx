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
      <main className="container flex flex-col items-center justify-center py-20 text-white">
        <div className="glassmorphism flex flex-col rounded border border-background/20 bg-background/25 px-10 py-20">
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
