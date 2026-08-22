import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'elite-trading-hub-super-secret-key-2026',

  providers: [
    // Google OAuth — for CLIENT users only
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '475847267545-r2o0nvq2ov57r22ghnhogn878ado54tg.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_secret',
    }),

    // Credentials — for ADMIN only (yash / 123123 or process.env)
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const inputUser = credentials?.username?.trim()
        const inputPass = credentials?.password?.trim()

        const validUsername = process.env.ADMIN_USERNAME || 'admin'
        const validPassword = process.env.ADMIN_PASSWORD || 'admin123'

        // Accept explicit user request credentials "yash" / "123123" OR environment variables
        const isYashAdmin = inputUser === 'yash' && inputPass === '123123'
        const isEnvAdmin = inputUser === validUsername && inputPass === validPassword

        if (isYashAdmin || isEnvAdmin) {
          return {
            id: 'admin-1',
            name: inputUser === 'yash' ? 'Yash (Administrator)' : 'Administrator',
            email: inputUser === 'yash' ? 'yash@nexus.com' : 'admin@elitetradinghub.com',
            role: 'ADMIN',
          }
        }
        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === 'credentials') {
          token.role = 'ADMIN'
        } else {
          token.role = 'CLIENT'
        }
        token.name = user.name
        token.email = user.email
        token.picture = (user as any).image
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
