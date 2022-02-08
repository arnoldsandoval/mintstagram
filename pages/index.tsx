import type { NextPage } from "next";
import { Container, Button, Heading, Stack, Text } from "@chakra-ui/react";
// import { authenticate, unauthenticate, currentUser } from "@onflow/fcl";
import { HeaderBar } from "../components";
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

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/media");
    }
  }, [router, status]);

  return (
    <>
      {!isAuthenticated && (
        <Container maxW="m">
          <Stack spacing={5}>
            <Heading as="h1" size="xl">
              Turn your Instagram post in to an NFT.
            </Heading>
            <Text as="h1" size="xl">
              Mintstagram is the fastest way turn your Instagram posts in to an
              NFT on the Flow blockchain.
            </Text>
            <Button
              variant="instagram"
              onClick={() => signIn("instagram")}
              maxW="sm"
              size="lg"
            >
              Sign in with Instagram
            </Button>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Home;
