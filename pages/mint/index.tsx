import { useSession } from "next-auth/react";
import { Box, Heading, Text, Stack, Spinner, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MediaGrid } from "../../components";
import { ConnectWallet } from "../../containers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getInstagramMedia } from "../../queries";
import { useWallet } from "../../contexts/FlowAuthContext";

type MediaItem = {
  id: string;
  media_type: string;
  media_url: string;
  username: string;
  timestamp: string;
  caption: string;
};

const Media: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const router = useRouter();
  const { data, isFetching } = useQuery("media", getInstagramMedia);
  const { currentWallet } = useWallet();
  const { loggedIn } = currentWallet;

  const [hasWallet] = useState(loggedIn);

  if (status === "loading" || isFetching) {
    return <Spinner />;
  }

  if (!hasWallet) {
    return <ConnectWallet username={session.user.name} />;
  }

  return (
    <Stack spacing={5}>
      <Heading as="h1" size="xl">
        What are you minting today?
      </Heading>
      <Text fontSize="xl" mb={5}>
        Select a piece of media below you wish to turn in to an NFT!
      </Text>
      <Box>
        <MediaGrid media={data.data} />
      </Box>
    </Stack>
  );
};

export default Media;
