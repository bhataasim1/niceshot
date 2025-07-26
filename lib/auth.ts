import prisma from '@/prisma/prisma';
import {
  checkout,
  polar,
  portal
} from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { env } from '../env/server';

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: env.POLAR_SERVER,
});

export const auth = betterAuth({
  appName: 'NiceShot',
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      use: [
        checkout({
          products: [
            {
              productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_PRO_ID || '',
              slug: process.env.NEXT_PUBLIC_POLAR_PRODUCT_PRO_SLUG || ''
            }
          ],
          successUrl: '/success?checkout_id={CHECKOUT_ID}',
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
    nextCookies(),
  ],
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
  trustedOrigins: ['http://localhost:3000'],
  allowedOrigins: ['http://localhost:3000'],
});
