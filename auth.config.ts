// auth.config.ts
import type { NextAuthConfig } from "next-auth"

export default {
  pages: {
    signIn: "/admin/login",
  },
  providers: [], // Провайдери додаються в auth.ts, бо вони потребують Prisma
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  }
} satisfies NextAuthConfig