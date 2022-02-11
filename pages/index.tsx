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
// import { authenticate, unauthenticate, currentUser } from "@onflow/fcl";
import { IoLogoInstagram } from "react-icons/io";
import { create } from "ipfs-http-client";
export const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  // const [user, setUser] = useState<any | null>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  // const [file, setFile] = useState<File>();

  // useEffect(() => {
  //   currentUser().subscribe((currentUser: any) => {
  //     setUser(currentUser);
  //     setIsLoggedIn(currentUser.loggedIn);
  //   });
  // }, []);

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

  if (!isAuthenticated && !isLoading) {
    return (
      <Container maxW="m">
        <Flex flexDirection="column" gridGap={5}>
          <Heading as="h1" size="xl">
            Turn your Instagram post in to an NFT.
          </Heading>
          <Box mb={5}>
            <Text as="h1" size="xl">
              Mintstagram is the fastest way turn your Instagram posts in to an
              NFT on the Flow blockchain.
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
    );
  }

  return <Spinner />;
};

export default Home;
