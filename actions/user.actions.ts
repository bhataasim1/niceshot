'use server';

import { getUser } from '@/lib/auth-utils';
import { getPurchaseActionDetails } from './purchase.action';
import { PurchaseDetailsResult } from '@/types/purchase.types';
import { User } from '@/prisma/generated/prisma';

export const getUserAction = async () => {
  const user = await getUser();
  return user;
};

export const getCurrentUserWithPurchase = async (): Promise<{
  user: User | null;
  purchase: PurchaseDetailsResult;
  isProUser: boolean;
}> => {
  const user = await getUser();
  if (!user) {
    return {
      user: null,
      purchase: { hasPurchase: false },
      isProUser: false,
    };
  }
  const purchase = await getPurchaseActionDetails();

  return { user, purchase, isProUser: purchase.hasPurchase };
};
