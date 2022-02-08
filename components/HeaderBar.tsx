import {
  Box,
  Grid,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { IoPersonOutline } from "react-icons/io5";

interface Props {
  isAuthenticated: boolean;
  session: any;
  handleSignOut: () => void;
}

export const HeaderBar = ({
  isAuthenticated,
  session,
  handleSignOut,
}: Props) => {
  return (
    <Box borderBottom="1px" borderColor="gray.900">
      <Grid
        templateColumns="repeat(2, auto)"
        gap={6}
        paddingInline={10}
        paddingBlock={3}
        alignItems="center"
      >
        <Box>
          <Heading as="h1" size="md">
            Mintstagram
          </Heading>
        </Box>
        <Flex justifyContent="flex-end">
          {isAuthenticated && (
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="full"
                _hover={{ bg: "gray.900" }}
                _expanded={{ bg: "white", color: "black" }}
                _focus={{ boxShadow: "outline" }}
              >
                <IoPersonOutline />
              </MenuButton>
              <MenuList>
                <MenuItem>{session.user.name}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleSignOut()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Grid>
    </Box>
  );
};
