import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async () => {
  if (typeof window === "undefined") {
    // SERVICE_NAME.NAMESPACE.svc.cluster.local
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );

    return {
      props: {
        currentUser: data,
      },
    };
  } else {
    const { data } = await axios.get("/api/users/currentuser");
    return {
      props: {
        currentUser: data,
      },
    };
  }
}) satisfies GetServerSideProps<any>;

export default function LoadingPage({
  currentUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(currentUser);

  return <h1>Test of project</h1>;
}
