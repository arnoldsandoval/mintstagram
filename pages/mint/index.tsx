import { useSession } from "next-auth/react";
import { Box, Heading, Text, Stack, Spinner, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MediaGrid } from "../../components";
import { ConnectWallet } from "../../containers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";
  const [data, setData] = useState({ data: [] });
  const [isLoading, setLoading] = useState(status === "loading");
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    if (isUnauthenticated) {
      router.push("/");
    }
  }, [isUnauthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetch("/api/media")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [status, isAuthenticated]);

  if (isLoading || isLoading) {
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
