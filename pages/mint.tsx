import { useSession } from "next-auth/react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Spinner,
  Progress,
  keyframes,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { MediaCard, MediaGrid } from "../components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const shine = `
  to {
    background-position: 200% center;
  }
`;

const Media: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router, status]);

  if (isAuthenticated && !isLoading) {
    return (
      <Box>
        <Stack spacing={5}>
          <Heading>Please wait, your NFT is being minted...</Heading>
          <Text fontSize="xl">
            This process can take between 2 and 10 minutes (boo!)
          </Text>
        </Stack>
        <Box mt={20}>
          <Progress size="xs" isIndeterminate colorScheme="whiteAlpha" />
        </Box>
      </Box>
    );
  }

  return <Spinner />;
};

export default Media;
