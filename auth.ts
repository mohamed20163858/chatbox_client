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
          if (!res.ok) {
            throw new Error(user.error || "Invalid credentials");
          }
          if (res.ok && user.token) {
            // console.log("User logged in:", user);
            return user;
          }
          return null;
        } catch (error) {
          console.log("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      // Check if user has set username and password
      //   console.log("User:", user);
      const BACKEND_URL =
        process.env.BACKEND_URL || "https://chatbox-server-eight.vercel.app";
      const res = await fetch(`${BACKEND_URL}/api/user/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.user.email }),
      });

      const data = await res.json();
      // console.log("User data:", data);
      if (!data.hasCredentials) {
        // Redirect to a custom page to set username/password
        console.log("User has not set username/password");
        return `/signup?email=${encodeURIComponent(
          user.user.email as string
        )}&name=${encodeURIComponent(user.user.name as string)}`;
      }
      //   delete data.hasCredentials;
      user.user.name = data.name;
      //   console.log("after User:", user);
      return true; // Proceed with the default flow
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        // Attach your custom user data to the token
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach custom user data to session
      //   console.log("Session:", user);
      session.user.name = token.name;
      return session;
    },
    // async redirect({ baseUrl }) {
    //   // Redirect to a specific path after sign-in
    //   return `${baseUrl}/home`; // Example redirect to "/dashboard"
    // },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  //   debug: true,
});
