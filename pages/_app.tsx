import type { AppProps } from "next/app";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { global, Button, Menu } from "../theme";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../containers";
fcl
  .config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

const theme = extendTheme({
  styles: {
    global,
  },
  components: {
    Button,
    Menu,
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
