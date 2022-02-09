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
  colors: {
    gray: {
      500: "#757575",
      600: "#616161",
      700: "#424242",
      800: "#212121",
      900: "#1d1d21",
    },
  },
  styles: {
    global,
  },
  components: {
    Button,
    Menu,
    Progress: {
      baseStyle: {
        track: {
          bg: "gray.900",
        },
      },
      variants: {
        green: {
          bg: "red",
        },
      },
    },
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
