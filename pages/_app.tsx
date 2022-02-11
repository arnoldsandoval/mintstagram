import "../flow.config";
import { ReactQueryDevtools } from "react-query/devtools";

import type { AppProps } from "next/app";
import * as types from "@onflow/types";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { global, Button, Menu } from "../theme";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../containers";
import { FlowAuthProvider } from "../contexts";
import { QueryClientProvider, QueryClient } from "react-query";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <FlowAuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </SessionProvider>
      </QueryClientProvider>
    </FlowAuthProvider>
  );
}

export default MyApp;
