import { useSession } from "next-auth/react";
import { Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { ConnectWallet } from "../../containers";
import { useRouter } from "next/router";
import { useWallet } from "../../contexts/FlowAuthContext";

const Media: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const router = useRouter();
  const { currentWallet } = useWallet();

  if (status === "loading") {
    return <Spinner />;
  }

  if (currentWallet.loggedIn) {
    router.push("/mint");
  }

  return <ConnectWallet username={session.user.name} />;
};

export default Media;
