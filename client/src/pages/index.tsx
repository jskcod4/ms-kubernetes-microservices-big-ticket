import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import buildClient from "../../api/build-client";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
} & InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = (async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return {
    props: {
      currentUser: data,
    },
  };
}) satisfies GetServerSideProps<any>;

export default function LoadingPage({ currentUser }: AppPropsWithLayout) {
  const renderedPage = currentUser ? (
    <h1>Your are signed in</h1>
  ) : (
    <h1>Test of project</h1>
  );

  return renderedPage;
}
