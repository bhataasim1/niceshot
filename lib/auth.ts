import prisma from '@/prisma/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { env } from '../env/server';

export const auth = betterAuth({
  appName: 'NiceShot',
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: true,
      },
      image: {
        type: 'string',
        required: false,
      },
    },
  },
  customPaths: {},
});
