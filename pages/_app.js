import { SessionProvider } from "next-auth/react";
// import { useSession } from "next-auth/react";
import React, { Fragment } from "react";
// import NavBar from "../components/layout/NavBar";
import Layout from "@/components/layout";
import { ToastWrapper } from "context/state";
import "../styles/custom.css";
import "../styles/globals.css";
// import "../styles/jodit3.css";

// import { appToastContext } from "context/state";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [refreshInterval, setRefreshInterval] = React.useState(432000);
  // const refreshInterval = 5;

  return (
    // <React.StrictMode>
    <SessionProvider session={session} refetchInterval={refreshInterval}>
      <ToastWrapper
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastWrapper>
    </SessionProvider>
    // </React.StrictMode>

  );
}

export default MyApp;
