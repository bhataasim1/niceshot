'use server';

import { getUser } from '@/lib/auth-utils';
import { getSubscriptionActionDetails } from './subscription.action';
import { SubscriptionDetailsResult } from '@/types/subscription.types';
import { User } from '@/prisma/generated/prisma';

export const getUserAction = async () => {
  const user = await getUser();
  return user;
};

export const getCurrentUserWithSubscription = async (): Promise<{
  user: User | null;
  subscription: SubscriptionDetailsResult;
  isProUser: boolean;
}> => {
  const user = await getUser();
  if (!user) {
    return {
      user: null,
      subscription: { hasSubscription: false },
      isProUser: false,
    };
  }
  const subscription = await getSubscriptionActionDetails();

  return { user, subscription, isProUser: subscription.hasSubscription };
};
