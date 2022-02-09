import { useSession } from "next-auth/react";
import { Box, Heading, Text, Stack, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MediaCard, MediaGrid } from "../components";
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
  const isLoading = status === "loading";
  const [data, setData] = useState({ data: [] });
  const [isFetching, setFetching] = useState(status === "loading");

  useEffect(() => {
    setFetching(true);
    fetch("api/media")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFetching(false);
      });
  }, [status]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router, status]);

  if (isAuthenticated && !isLoading && !isFetching) {
    return (
      <Stack spacing={5}>
        <Box mb={5}>
          <Heading as="h1" size="xl" mb={3}>
            Hi, {session.user.name}!
          </Heading>
          <Text fontSize="xl">
            Select a piece of media below you wish to turn in to an NFT!
          </Text>
        </Box>
        <MediaGrid media={data.data} />
      </Stack>
    );
  }

  return <Spinner />;
};

export default Media;
