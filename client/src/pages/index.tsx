import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async () => {
  const response = await axios.get(
    "https://ticketing.dev/api/users/currentuser"
  );
  return response.data;
}) satisfies GetServerSideProps<{ currentUser: unknown }>;

export default function LoadingPage({
  currentUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(currentUser);

  return <h1>Test of project</h1>;
}
