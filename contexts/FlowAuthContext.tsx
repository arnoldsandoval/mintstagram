import * as fcl from "@onflow/fcl";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
// import { useTransaction } from "./TransactionContext";

interface AuthContextObject {
  currentWallet: { loggedIn: boolean; addr?: string };
  logOut: () => void;
  logIn: () => void;
  signUp: () => void;
}

export const FlowAuthContext = createContext<AuthContextObject>({
  logIn: () => {},
  logOut: () => {},
  signUp: () => {},
  currentWallet: { loggedIn: false, addr: undefined },
});

export const useWallet = () => useContext(FlowAuthContext);

interface Props {
  children: ReactNode;
}

export const FlowAuthProvider = ({ children }: Props) => {
  // const { initTransactionState, setTxId, setTransactionStatus } =
  //   useTransaction();
  const [currentWallet, setWallet] = useState({
    loggedIn: false,
    addr: undefined,
  });
  // const [userProfile, setProfile] = useState(null);
  // const [profileExists, setProfileExists] = useState(false);

  useEffect(() => fcl.currentUser.subscribe(setWallet), []);

  // const loadProfile = useCallback(async () => {
  //   const profile = await fcl.query({
  //     cadence: `
  //       import Profile from 0xProfile

  //       pub fun main(address: Address): Profile.ReadOnly? {
  //         return Profile.read(address)
  //       }
  //     `,
  //     args: (arg, t) => [arg(currentWallet.addr, t.Address)],
  //   });
  //   setProfile(profile ?? null);
  //   setProfileExists(profile !== null);
  //   return profile;
  // }, [currentWallet, setProfile, setProfileExists]);

  // useEffect(() => {
  //   // Upon login check if a userProfile exists
  //   if (currentWallet.loggedIn && userProfile === null) {
  //     loadProfile();
  //   }
  // }, [currentWallet, userProfile, loadProfile]);
  ` `;
  const logOut = async () => {
    await fcl.unauthenticate();
    setWallet({ addr: undefined, loggedIn: false });
    // setProfile(null);
    // setProfileExists(false);
  };

  const logIn = () => {
    fcl.logIn();
  };

  const signUp = () => {
    fcl.signUp();
  };

  // const createProfile = async () => {
  //   initTransactionState();

  //   const transactionId = await fcl.mutate({
  //     cadence: `
  //       import Profile from 0xProfile

  //       transaction {
  //         prepare(account: AuthAccount) {
  //           // Only initialize the account if it hasn't already been initialized
  //           if (!Profile.check(account.address)) {
  //             // This creates and stores the profile in the user's account
  //             account.save(<- Profile.new(), to: Profile.privatePath)

  //             // This creates the public capability that lets applications read the profile's info
  //             account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
  //           }
  //         }
  //       }
  //     `,
  //     payer: fcl.authz,
  //     proposer: fcl.authz,
  //     authorizations: [fcl.authz],
  //     limit: 50,
  //   });
  //   setTxId(transactionId);
  //   fcl.tx(transactionId).subscribe((res) => {
  //     setTransactionStatus(res.status);
  //     if (res.status === 4) {
  //       loadProfile();
  //     }
  //   });
  // };

  // const updateProfile = async ({ name, color, info }) => {
  //   console.log("Updating profile", { name, color, info });
  //   initTransactionState();

  //   const transactionId = await fcl.mutate({
  //     cadence: `
  //       import Profile from 0xProfile

  //       transaction(name: String, color: String, info: String) {
  //         prepare(account: AuthAccount) {
  //           account
  //             .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
  //             .setName(name)

  //           account
  //             .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
  //             .setInfo(info)

  //           account
  //             .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
  //             .setColor(color)
  //         }
  //       }
  //     `,
  //     args: (arg, t) => [
  //       arg(name, t.String),
  //       arg(color, t.String),
  //       arg(info, t.String),
  //     ],
  //     payer: fcl.authz,
  //     proposer: fcl.authz,
  //     authorizations: [fcl.authz],
  //     limit: 50,
  //   });
  //   setTxId(transactionId);
  //   fcl.tx(transactionId).subscribe((res) => {
  //     setTransactionStatus(res.status);
  //     if (res.status === 4) {
  //       loadProfile();
  //     }
  //   });
  // };

  const value = {
    currentWallet,
    // userProfile,
    // profileExists,
    logOut,
    logIn,
    signUp,
    // loadProfile,
    // createProfile,
    // updateProfile,
  };

  console.log("FlowAuthProvider", value);

  return (
    <FlowAuthContext.Provider value={value}>
      {children}
    </FlowAuthContext.Provider>
  );
};
