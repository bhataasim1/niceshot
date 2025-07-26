'use server';
import { getUser } from '@/lib/auth-utils';
import { Subscription } from '@/prisma/generated/prisma';
import prisma from '@/prisma/prisma';
import { SubscriptionDetailsResult } from '@/types/subscription.types';

export const getSubscriptionActionDetails =
  async (): Promise<SubscriptionDetailsResult> => {
    try {
      const user = await getUser();
      if (!user) {
        return { hasSubscription: false, error: 'User not found' };
      }

      const userSubscriptions = await prisma.subscription.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!userSubscriptions.length) {
        return { hasSubscription: false, error: 'No subscriptions found' };
      }

      const userActiveSubscriptions: Subscription = userSubscriptions
        .filter((subscription) => subscription.status === 'active')
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

      if (!userActiveSubscriptions) {
        const latestSubscription = userSubscriptions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        if (latestSubscription) {
          const now = new Date();
          const isExpired = new Date(latestSubscription.currentPeriodEnd) < now;
          const isCanceled = latestSubscription.status === 'canceled';

          const result = {
            hasSubscription: true,
            subscription: {
              id: latestSubscription.id,
              productId: latestSubscription.productId,
              status: latestSubscription.status,
              amount: latestSubscription.amount,
              currency: latestSubscription.currency,
              recurringInterval: latestSubscription.recurringInterval,
              currentPeriodStart: latestSubscription.currentPeriodStart,
              currentPeriodEnd: latestSubscription.currentPeriodEnd,
              cancelAtPeriodEnd: latestSubscription.cancelAtPeriodEnd,
              canceledAt: latestSubscription.canceledAt,
            },
            error: isCanceled
              ? 'Subscription has been canceled'
              : isExpired
                ? 'Subscription has expired'
                : 'Subscription is not active',
            errorType: (isCanceled
              ? 'CANCELED'
              : isExpired
                ? 'EXPIRED'
                : 'GENERAL') as 'CANCELED' | 'EXPIRED' | 'GENERAL',
          };

          return result;
        }
      }

      const result = {
        hasSubscription: true,
        subscription: {
          id: userActiveSubscriptions.id,
          productId: userActiveSubscriptions.productId,
          status: userActiveSubscriptions.status,
          amount: userActiveSubscriptions.amount,
          currency: userActiveSubscriptions.currency,
          recurringInterval: userActiveSubscriptions.recurringInterval,
          currentPeriodStart: userActiveSubscriptions.currentPeriodStart,
          currentPeriodEnd: userActiveSubscriptions.currentPeriodEnd,
          cancelAtPeriodEnd: userActiveSubscriptions.cancelAtPeriodEnd,
          canceledAt: userActiveSubscriptions.canceledAt,
        },
      };

      return result;
    } catch (error) {
      console.error(error);
      return {
        hasSubscription: false,
        error: 'Error fetching subscription details',
      };
    }
  };

export const isProUser = async (): Promise<boolean> => {
  const subscriptionDetails = await getSubscriptionActionDetails();
  return (
    subscriptionDetails.hasSubscription &&
    subscriptionDetails.subscription?.status === 'active'
  );
};
