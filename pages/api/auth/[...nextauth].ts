import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { NEXTAUTH_SECRET } = process.env;

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Usuario",
          type: "text",
          placeholder: "Usuario",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      authorize: async (credentials) => {
        const admin = await prisma.admin.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        await prisma.$disconnect();

        if (admin && admin.password === credentials?.password) {
          return {
            username: admin.username,
            id: admin.id,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = user.username;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: NEXTAUTH_SECRET,
  jwt: {
    secret: NEXTAUTH_SECRET,
  },
});
