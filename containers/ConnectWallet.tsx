import { Box, Text, Stack, Button } from "@chakra-ui/react";
import { BiCoin } from "react-icons/bi";

export const ConnectWallet = () => {
  return (
    <Stack spacing={5}>
      <Text fontSize="xl" mb={5}>
        Before we can continue, please connect your Flow wallet.
      </Text>
      <Box>
        <Button leftIcon={<BiCoin size={26} />}>Connect to Blocto</Button>
      </Box>
    </Stack>
  );
};
