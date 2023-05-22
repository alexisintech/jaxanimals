import { GetServerSidePropsContext, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "~/components/ui/Header";
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
      info: user?.name,
    },
    {
      title: "Email",
      info: user?.email,
    },
    {
      title: "Phone Number",
      info: user?.phone,
    },
    {
      title: "Facebook",
      info: user?.facebook,
    },
    {
      title: "Instagram",
      info: user?.instagram,
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
      <main className="container flex flex-col items-center justify-center px-4">
        {userInfo.map((data, index) => {
          return (
            <div
              key={index}
              className="mb-2 flex gap-2 text-3xl font-extrabold"
            >
              <p>{data.title}:</p>
              <p
                className={
                  data.title === "Name" || "Email"
                    ? "opacity-80"
                    : "opacity-100"
                }
              >
                {data.info}
              </p>
            </div>
          );
        })}
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
