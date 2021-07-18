// import "../styles/globals.css";
import React, { Fragment } from "react";
import NavBar from "../components/layout/NavBar";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <NavBar />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
