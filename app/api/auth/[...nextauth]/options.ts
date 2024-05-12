import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from 'next-auth/adapters';
import prisma from '@/prisma/db'
 

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        return null
        /*
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }*/
      }
    }), 
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    }),    
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  /*
  pages: {
    signIn: "/auth/signIn"
  }*/
};

export default authOptions;
