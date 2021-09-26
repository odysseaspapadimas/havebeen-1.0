import "tailwindcss/tailwind.css";
import Head from "next/head";

import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta
          name="keywords"
          content="havebeen, have, travel, diary, places, log"
        />
        <title>Welcome to HaveBeen</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      <style jsx global>
        {`
          body {
            background-color: #0b0e11 !important;
            color: #fff !important;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
