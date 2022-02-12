import { Container, Text, Flex, Button, Heading } from "@chakra-ui/react";
import { BiWallet } from "react-icons/bi";
import { useWallet } from "../contexts/FlowAuthContext";

interface Props {
  username: string;
}

export const ConnectWallet = ({ username }: Props) => {
  const { logIn } = useWallet();

  return (
    <Container maxW="m">
      <Flex flexDirection="column" gridGap={5}>
        <Heading as="h1" size="xl">
          Hi, {username}!
        </Heading>

        <Text fontSize="xl" mb={5}>
          Before we can continue, please connect your Flow wallet.
        </Text>
        <Button onClick={logIn} leftIcon={<BiWallet size={26} />}>
          Connect Flow Wallet
        </Button>
      </Flex>
    </Container>
  );
};
