import NextAuth from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export default NextAuth({
  debug: false,
  secret: process.env.SECRET,
  providers: [
    {
      id: "instagram",
      name: "Instagram",
      type: "oauth",
      authorization:
        "https://api.instagram.com/oauth/authorize?scope=user_profile",
      token: {
        url: "https://api.instagram.com/oauth/access_token",
        async request(context: { provider: any; params: { code: any } }) {
          const {
            provider,
            params: { code },
          } = context;
          const body = new URLSearchParams([
            ["grant_type", "authorization_code"],
            ["code", code],
            ["client_id", provider.clientId],
            ["client_secret", provider.clientSecret],
            ["redirect_uri", provider.callbackUrl],
          ]);

          const response = await (
            await fetch(provider.token.url, {
              method: "POST",
              body,
            })
          ).json();
          const { access_token } = response;
          return { tokens: { access_token } };
        },
      },
      userinfo:
        "https://graph.instagram.com/me?fields=id,username,account_type,name",
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      async profile(profile: any) {
        // console.log(profile.media.data);
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          account_type: profile.account_type,
          // media: profile.media,
        };
      },
    },
  ],
  session: { jwt: true },
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
