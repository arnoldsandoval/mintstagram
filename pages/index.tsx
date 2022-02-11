import type { NextPage } from "next";
import {
  Container,
  Button,
  Heading,
  Flex,
  Text,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { IoLogoInstagram } from "react-icons/io";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  // import { create } from "ipfs-http-client";
  // export const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

  // const mint = async () => {
  //   if (!file) return;

  //   const added = await client.add(file);
  //   const hash = added.path;

  //   console.log(hash);
  // };

  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/mint");
    }
  }, [isAuthenticated, router, status]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {!isAuthenticated && !isLoading && (
        <Container maxW="m">
          <Flex flexDirection="column" gridGap={5}>
            <Heading as="h1" size="xl">
              Turn your Instagram post in to an NFT.
            </Heading>
            <Box mb={5}>
              <Text as="h1" size="xl">
                Mintstagram is the fastest way turn your Instagram posts in to
                an NFT on the Flow blockchain.
              </Text>
            </Box>
            <Button
              variant="instagram"
              leftIcon={<IoLogoInstagram size={28} />}
              onClick={() => signIn("instagram")}
              maxW="sm"
              size="lg"
            >
              Sign in with Instagram
            </Button>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default Home;
