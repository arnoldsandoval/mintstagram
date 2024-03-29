import type { NextPage } from "next";
import Link from "next/link";
import {
  Container,
  Button,
  Heading,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { IoLogoInstagram } from "react-icons/io";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

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
  const { data: session, status } = useSession({
    onAuthenticated() {
      router.push("/mint");
    },
  });

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <Container maxW="m">
      <Flex flexDirection="column" gridGap={5}>
        <Heading as="h1" size="xl">
          Turn your Instagram post in to an NFT.
        </Heading>

        <Text as="h1" fontSize="xl" mb={5}>
          Mintstagram is the easiest way turn your Instagram posts in to NFTs on
          Flow.
        </Text>

        {status === "unauthenticated" && (
          <Button
            variant="instagram"
            leftIcon={<IoLogoInstagram size={28} />}
            onClick={() => signIn("instagram", { callbackUrl: `/mint` })}
            maxW="sm"
            size="lg"
          >
            Sign in with Instagram
          </Button>
        )}

        {status === "authenticated" && (
          <Link href="/mint" passHref>
            <Button as="a" maxW="sm" size="lg">
              Get Started
            </Button>
          </Link>
        )}
      </Flex>
    </Container>
  );
};

export default Home;
