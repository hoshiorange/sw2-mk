import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      discordId?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    discordId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    discordId?: string;
  }
}
