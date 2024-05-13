import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from 'next-auth/adapters';
import prisma from '@/prisma/db'
import { z } from 'zod';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        // FROM LEAN NEXTJS
        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log(email);
          console.log(password);
          //const user = await getUser(email);
          //if (!user) return null;          
          //const passwordsMatch = await bcrypt.compare(password, user.password); 
          //if (passwordsMatch) return user;
        } 
        //console.log('Invalid credentials');
        //return null;
        // END




        const userCredentials = {
          email: credentials?.email,
          password: credentials?.password,
        };
  
        const res = await fetch(
          `http://localhost:3000/api/user/login`,
          {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }        
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
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  /*
  pages: {
    signIn: "/auth/signIn"
  }*/
};

export default authOptions;
