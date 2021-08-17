import "tailwindcss/tailwind.css";

import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
