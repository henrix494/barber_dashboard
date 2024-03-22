import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { getUserByUserName } from "@/data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { userName: username, password } = credentials;
        const user = await getUserByUserName(username as string);

        if (user?.password === password) {
          return {
            ...user,
            id: user?.id.toString(), // Convert id to string
          };
        } else {
          return null;
        }
      },
    }),
  ],
} as NextAuthConfig;
