import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "~/components/ui/Header";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

const Settings: NextPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const id = useRouter().query.id as string;

  // TO-DO: Set up a redirect to the login page if the user is not logged in

  const { data: userInfo } = api.example.getUser.useQuery({ id });

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
      <p>{userInfo?.email}</p>
      <p>{userInfo?.name}</p>
      <p>phone: {userInfo?.phone}</p>
      <p>fb: {userInfo?.facebook}</p>
      <p>ig: {userInfo?.instagram}</p>
      <p>{}</p>
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
