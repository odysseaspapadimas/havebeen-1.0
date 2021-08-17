import "tailwindcss/tailwind.css";

import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            background: #0b0e11;
            color: #fff;
          }
        `}</style>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
