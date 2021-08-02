import { Provider } from "next-auth/client";
import React, { Fragment } from "react";
// import NavBar from "../components/layout/NavBar";
import Layout from "@/components/layout";

import "../styles/styles.css";
import "../styles/jodit3.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
