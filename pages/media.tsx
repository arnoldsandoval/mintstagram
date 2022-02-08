import { useSession } from "next-auth/react";
import { Grid, Box, Heading, Text, Stack, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MediaCard } from "../components";
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
          <Text>
            Select a piece of media below you wish to turn in to an NFT!
          </Text>
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {data.data.map(
            ({
              id,
              media_type,
              media_url,
              username,
              timestamp,
              caption,
            }: MediaItem) => (
              <MediaCard
                key={id}
                id={id}
                media_type={media_type}
                media_url={media_url}
                username={username}
                timestamp={timestamp}
                caption={caption}
              />
            )
          )}
        </Grid>
      </Stack>
    );
  }

  return <Spinner />;
};

export default Media;
