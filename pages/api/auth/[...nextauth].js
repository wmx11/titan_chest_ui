import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import routes from '../../../config/routes';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username',
          name: 'name',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
          name: 'password',
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${routes.titan_chest}/user/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user.data.user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = { accessToken: user.token };
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/login',
  },
});
