import { useSession } from "next-auth/react";
import { Box, Heading, Text, Stack, Spinner, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MediaGrid } from "../../components";
import { ConnectWallet } from "../../containers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getInstagramMedia } from "../../queries";

type MediaItem = {
  id: string;
  media_type: string;
  media_url: string;
  username: string;
  timestamp: string;
  caption: string;
};

const Media: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, error, isError, isFetching } = useQuery(
    "media",
    getInstagramMedia
  );

  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";
  const isLoading = status === "loading" || isFetching;
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    if (isUnauthenticated) {
      router.push("/");
    }
  }, [isUnauthenticated, isLoading, router]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated && !hasWallet) {
    return <ConnectWallet />;
  }

  if (isAuthenticated && !isLoading && !isLoading) {
    return (
      <Stack spacing={5}>
        <Heading as="h1" size="xl">
          Hi, {session.user.name}!
        </Heading>
        <Text fontSize="xl" mb={5}>
          Select a piece of media below you wish to turn in to an NFT!
        </Text>
        <Box>
          <MediaGrid media={data.data} />
        </Box>
      </Stack>
    );
  }

  return <Spinner />;
};

export default Media;
