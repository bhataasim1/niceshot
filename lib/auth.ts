import prisma from '@/prisma/prisma';
import { checkout, polar, portal, webhooks } from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { env } from '../env/server';
import { safeParseDate } from './safe-parse-date';

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
              slug: process.env.NEXT_PUBLIC_POLAR_PRODUCT_PRO_SLUG || '',
            },
          ],
          successUrl: '/success?checkout_id={CHECKOUT_ID}',
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onPayload: async ({ data, type }) => {
            if (
              type === 'order.created' ||
              type === 'order.paid' ||
              type === 'order.updated' ||
              type === 'order.refunded'
            ) {
              try {
                const userId = data.customer.externalId;
                if (!userId) {
                  throw new Error('User ID not found');
                }

                await prisma.$transaction(async (tx) => {
                  const user = await tx.user.findUnique({
                    where: {
                      id: userId,
                    },
                  });

                  if (!user) {
                    throw new Error('User not found');
                  }

                  const orderData = {
                    id: data.id,
                    createdAt: new Date(data.createdAt),
                    modifiedAt: safeParseDate(data.modifiedAt),
                    status: data.status,
                    paid: data.paid,
                    subtotalAmount: data.subtotalAmount,
                    discountAmount: data.discountAmount,
                    netAmount: data.netAmount,
                    amount: data.amount,
                    taxAmount: data.taxAmount,
                    totalAmount: data.totalAmount,
                    refundedAmount: data.refundedAmount,
                    refundedTaxAmount: data.refundedTaxAmount,
                    currency: data.currency,
                    billingReason: data.billingReason,
                    billingName: data.billingName,
                    billingAddress: data.billingAddress
                      ? JSON.stringify(data.billingAddress)
                      : null,
                    isInvoiceGenerated: data.isInvoiceGenerated,
                    customerId: data.customerId,
                    productId: data.productId,
                    discountId: data.discountId,
                    subscriptionId: data.subscriptionId,
                    checkoutId: data.checkoutId,
                    metadata: data.metadata
                      ? JSON.stringify(data.metadata)
                      : null,
                    customFieldData: data.customFieldData
                      ? JSON.stringify(data.customFieldData)
                      : null,
                    userId: userId,
                  };

                  await tx.order.upsert({
                    where: {
                      id: data.id,
                    },
                    update: {
                      ...orderData,
                      billingAddress: orderData.billingAddress
                        ? JSON.parse(orderData.billingAddress)
                        : null,
                      metadata: orderData.metadata
                        ? JSON.parse(orderData.metadata)
                        : null,
                      customFieldData: orderData.customFieldData
                        ? JSON.parse(orderData.customFieldData)
                        : null,
                    },
                    create: {
                      ...orderData,
                      billingAddress: orderData.billingAddress
                        ? JSON.parse(orderData.billingAddress)
                        : null,
                      metadata: orderData.metadata
                        ? JSON.parse(orderData.metadata)
                        : null,
                      customFieldData: orderData.customFieldData
                        ? JSON.parse(orderData.customFieldData)
                        : null,
                    },
                  });
                });
              } catch (error) {
                console.error(error);
              }
            }
          },
        }),
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
