import { SessionProvider } from "next-auth/react";

import React, { Fragment } from "react";
// import NavBar from "../components/layout/NavBar";
import Layout from "@/components/layout";

import "../styles/custom.css";
import "../styles/globals.css";

import "../styles/jodit3.css";
import { appToastContext } from "context/state";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
