'use server';

import { getUser } from '@/lib/auth-utils';
import { getOrderActionDetails } from './purchase.action';
import { OrderDetailsResult } from '@/types/purchase.types';
import { User } from '@/prisma/generated/prisma';

export const getUserAction = async () => {
  const user = await getUser();
  return user;
};

export const getCurrentUserWithOrder = async (): Promise<{
  user: User | null;
  order: OrderDetailsResult;
  isProUser: boolean;
}> => {
  const user = await getUser();
  if (!user) {
    return {
      user: null,
      order: { hasOrder: false },
      isProUser: false,
    };
  }
  const order = await getOrderActionDetails();

  return { user, order, isProUser: order.hasOrder };
};
