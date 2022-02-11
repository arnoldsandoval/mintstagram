import { Container, Text, Flex, Button } from "@chakra-ui/react";
import { BiWallet } from "react-icons/bi";
import { useWallet } from "../contexts/FlowAuthContext";

export const ConnectWallet = () => {
  const { logIn, signUp, logOut, currentWallet } = useWallet();
  return (
    <Container maxW="m">
      <Flex flexDirection="column" gridGap={5}>
        <Text fontSize="xl" mb={5}>
          Before we can continue, please connect your Flow wallet.
        </Text>
        <Button onClick={logIn} leftIcon={<BiWallet size={26} />}>
          Connect Flow Wallet
        </Button>
        <Button onClick={signUp} variant="link">
          <Text fontSize={26} mr={3}>
            🤔
          </Text>{" "}
          I don&lsquo;t have a wallet
        </Button>
      </Flex>
    </Container>
  );
};
