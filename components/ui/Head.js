import { Component } from "react";
import Head from "next/head";

export default class extends Component {
  render() {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta charSet="utf-8" />
          <title>Your page title</title>
          <meta
            name="description"
            content="An example of a meta description."
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
        </Head>
        <div>Page Content</div>
      </>
    );
  }
}
