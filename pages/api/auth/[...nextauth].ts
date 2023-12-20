import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import { WithId } from 'mongodb';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import { OAuthUserConfig } from 'next-auth/providers/oauth';

import { connectDB } from '../../../utils/mongoDB';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: '이메일을 입력하세요.',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '비밀번호를 입력하세요.',
        },
      },

      async authorize(credentials): Promise<WithId<User> | null> {
        if (credentials === undefined) {
          throw new Error('Invalid credentials');
        }
        if (
          credentials.email.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')[0]
        ) {
          return null;
        }
        const db = (await connectDB).db('word_blog_user');
        const user = await db
          .collection('users')
          .findOne({ email: credentials.email });

        if (!user) {
          return null;
        }
        if (user.deactivate) {
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!pwcheck) {
          return null;
        }

        return user as WithId<User>;
      },
    }),
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
    } as OAuthUserConfig<GithubProfile>),
  ],

  pages: {
    signIn: '/login',
    newUser: '/register',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },

    session: async ({ session }) => {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_PASSWORD,
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
