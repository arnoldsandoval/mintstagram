// components/Layout.js
import React, { Component } from "react";
import { HeaderBar } from "../components";
import type { ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <>
      <Head>
        <title>Mintstagram</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="layout">
        <HeaderBar
          isAuthenticated={isAuthenticated}
          session={session}
          handleSignOut={() => signOut({ redirect: false })}
        />

        <Container
          maxW="container.xl"
          paddingBlockStart={10}
          paddingInline={10}
          pt={14}
          pb={10}
          as="main"
        >
          {children}
        </Container>
      </div>
    </>
  );
};
