import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import * as fs from "fs";
import { User } from "interfaces/User";

const getData = () => {
  const data = fs.readFileSync("data/accounts.json");
  return JSON.parse(data.toString());
};

const getUser = (username: string | undefined) => {
  if (username) {
    const users = getData();
    return users.find((user: User) => user.username === username);
  }
  return null;
};

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
        password: { label: "Contraseña", type: "password" },
      },
      authorize: (credentials) => {
        const user = getUser(credentials?.username);

        if (user && user.password === credentials?.password) {
          return {
            username: user.username,
            id: user.id,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
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
  secret: "bodydesaliba",
  jwt: {
    secret: "bodydesaliba",
  },
});
