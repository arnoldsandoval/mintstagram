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
  Button,
  Text,
} from "@chakra-ui/react";
import { BiUser, BiWallet, BiLogOut } from "react-icons/bi";
import { IoLogoInstagram } from "react-icons/io";
import { useWallet } from "../contexts/FlowAuthContext";
interface Props {
  isAuthenticated: boolean;
  session: any;
  handleSignOut: () => void;
}

export const HeaderBar = ({
  isAuthenticated,
  session,
  handleSignOut: instagramSignOut,
}: Props) => {
  const { logOut, currentWallet } = useWallet();

  const handleSignOut = () => {
    instagramSignOut();
    logOut();
  };

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
                <BiUser size={24} />
                {currentWallet.addr &&
                  currentWallet.addr.slice(0, 3) +
                    "..." +
                    currentWallet.addr.slice(-3)}
              </MenuButton>
              <MenuList>
                <MenuItem icon={<IoLogoInstagram size={24} />}>
                  {session.user.name}
                </MenuItem>
                <MenuItem icon={<BiWallet size={24} />}>
                  {!currentWallet.addr && <>No wallet connected</>}
                  {currentWallet.addr && <>{currentWallet.addr}</>}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<BiLogOut size={24} />}
                  onClick={() => handleSignOut()}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Grid>
    </Box>
  );
};
