import type { AppProps } from "next/app";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { global, Button, Menu } from "../theme";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../containers";
import { QueryClientProvider, QueryClient } from "react-query";
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

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
