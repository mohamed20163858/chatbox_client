import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import TikTok from "next-auth/providers/tiktok";
import Discord from "next-auth/providers/discord";

import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    TikTok,
    Discord,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const BACKEND_URL =
            process.env.BACKEND_URL ||
            "https://chatbox-server-eight.vercel.app";
          const res = await fetch(`${BACKEND_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          const user = await res.json();
          if (res.ok && user.token) {
            // console.log("User logged in:", user);
            return user;
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async redirect({ baseUrl }) {
      // Redirect to a specific path after sign-in
      return `${baseUrl}/home`; // Example redirect to "/dashboard"
    },
  },
  pages: {
    signIn: "/signin",
  },
  debug: true,
});
