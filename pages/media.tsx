import { useSession } from "next-auth/react";
import { Grid, Box, Heading, Text, Stack, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MediaCard } from "../components";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MOCK_RESPONSE = {
  data: [
    {
      id: "17920149896241959",
      caption: "Mint me. #nft #flow #mintstagramme",
      media_type: "IMAGE",
      media_url:
        "https://scontent-sjc3-1.cdninstagram.com/v/t51.29350-15/273468219_1044091892803807_4525641201751717121_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=RiqkR5MbOK0AX9pyPJG&_nc_oc=AQmJIf81rIhtF08s6mjV3jyrv3JkL9C0SJezNl2t7L0CKYH8G9RsnMd5f5toRcKEcfg&_nc_ht=scontent-sjc3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AT9yhAKvALjpEE7q4F8m8W44dpcvoy81J_iB-5c5TVspRQ&oe=62067A48",
      username: "mintstagramme",
      timestamp: "2022-02-07T19:50:03+0000",
    },
  ],
  paging: {
    cursors: {
      before:
        "QVFIUjlxS2lVU0QxM3ZAqNGJ2S2x6dnF5WjhGZAlh5LWxrWTFaUlhtSUlueXBjeG9TZAXZAOb2dzbDM4TERZAUm5kRXhGNUJoMVg0OVNVU0ljV0JMbFVRa2h4NDFn",
      after:
        "QVFIUjlxS2lVU0QxM3ZAqNGJ2S2x6dnF5WjhGZAlh5LWxrWTFaUlhtSUlueXBjeG9TZAXZAOb2dzbDM4TERZAUm5kRXhGNUJoMVg0OVNVU0ljV0JMbFVRa2h4NDFn",
    },
  },
};

const Media: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status !== "authenticated") {
    return <Spinner />;
  }

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
        {MOCK_RESPONSE.data.map(
          ({ id, media_type, media_url, username, timestamp, caption }) => (
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
};

export default Media;
