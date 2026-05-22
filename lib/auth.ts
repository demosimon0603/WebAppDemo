import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email?.toLowerCase();
      return Boolean(email && adminEmails().includes(email));
    },
    async session({ session }) {
      const email = session.user?.email?.toLowerCase();
      return {
        ...session,
        isAdmin: Boolean(email && adminEmails().includes(email))
      };
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login"
  }
};
