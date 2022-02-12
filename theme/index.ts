import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { Button } from "./Button";
import { Menu } from "./Menu";
import { global } from "./global";

export const theme = extendTheme({
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
    Text: {
      variants: {
        mono: {
          fontFamily: "Roboto Mono",
        },
      },
    },
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
