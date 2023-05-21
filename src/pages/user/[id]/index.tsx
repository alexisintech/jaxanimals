import { GetServerSidePropsContext, type NextPage } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "~/components/ui/Header";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";

const Settings: NextPage = () => {
  const { data: session } = useSession();
  const id = useRouter().query.id as string;

  // TO-DO: Set up a redirect to the login page if the user is not logged in

  const { data: user } = api.example.getUser.useQuery({ id });

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
        <div className="mb-2 flex gap-2 text-3xl font-extrabold">
          <p className="opacity-80">Name</p>
          <p>{user?.name}</p>
        </div>
        <div className="mb-2 flex gap-2 text-3xl font-extrabold">
          <p className="opacity-80">Email</p>
          <p>{user?.email}</p>
        </div>
        <div className="mb-2 flex gap-2 text-3xl font-extrabold">
          <p className="opacity-80">Phone</p>
          <p>{user?.phone}</p>
        </div>
        <div className="mb-2 flex gap-2 text-3xl font-extrabold">
          <p className="opacity-80">Facebook</p>
          <p>{user?.facebook}</p>
        </div>
        <div className="mb-2 flex gap-2 text-3xl font-extrabold">
          <p className="opacity-80">Instagram</p>
          <p>{user?.instagram}</p>
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
