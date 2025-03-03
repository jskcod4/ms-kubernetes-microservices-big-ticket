import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import buildClient from "../../api/build-client";

export const getServerSideProps = (async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return {
    props: {
      currentUser: data,
    },
  };
}) satisfies GetServerSideProps<any>;

export default function LoadingPage({
  currentUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(currentUser);

  return currentUser ? <h1>Your are signed in</h1> : <h1>Test of project</h1>;
}
