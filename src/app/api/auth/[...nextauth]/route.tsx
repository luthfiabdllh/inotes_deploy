import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://note-iota-two.vercel.app/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email ?? "",
              password: credentials?.password ?? ""
            })
          });

          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("Invalid email or password");
            }
            throw new Error("Internal Server Error");
          }

          const data = await res.json();
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.token
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: "/login", 
  },
  secret: "hewajesa",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
