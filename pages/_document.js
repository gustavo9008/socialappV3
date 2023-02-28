import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-gradientLight dark:bg-gradientDark">
        <Head />
        <body className="bg-gradientLight dark:bg-gradientDark min-h-screen pt-20 font-sans text-gray-800 dark:text-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
