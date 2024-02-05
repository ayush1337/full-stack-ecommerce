import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authConfig = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, request) {
        const { email, password } = credentials;
        //send req to api route
        const { user, error } = await fetch(
          'http://localhost:3000/api/auth/signin',
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          }
        ).then(async (res) => await res.json());
        if (error) return null;

        return { id: user.id, ...user };
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token = { ...params.token, ...params.user };
      }
      return params.token;
    },
    async session(params) {
      const user = params.token;
      if (user) {
        params.session.user = {
          ...params.session.user,
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          verified: user.verified,
          role: user.role,
        };
      }

      return params.session;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);