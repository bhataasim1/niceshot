'use server';
import { getUser } from '@/lib/auth-utils';
import { Purchase } from '@/prisma/generated/prisma';
import prisma from '@/prisma/prisma';
import { PurchaseDetailsResult } from '@/types/purchase.types';

export const getPurchaseActionDetails =
  async (): Promise<PurchaseDetailsResult> => {
    try {
      const user = await getUser();
      if (!user) {
        return { hasPurchase: false, error: 'User not found' };
      }

      const userPurchases = await prisma.purchase.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!userPurchases.length) {
        return { hasPurchase: false, error: 'No purchases found' };
      }

      const userCompletedPurchase: Purchase = userPurchases
        .filter((purchase) => purchase.status === 'completed')
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

      if (!userCompletedPurchase) {
        const latestPurchase = userPurchases.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        if (latestPurchase) {
          const result = {
            hasPurchase: true,
            purchase: {
              id: latestPurchase.id,
              productId: latestPurchase.productId,
              status: latestPurchase.status,
              amount: latestPurchase.amount,
              currency: latestPurchase.currency,
              createdAt: latestPurchase.createdAt,
              updatedAt: latestPurchase.updatedAt,
              paymentMethod: latestPurchase.paymentMethod,
            },
            error:
              latestPurchase.status === 'failed'
                ? 'Purchase failed'
                : latestPurchase.status === 'refunded'
                  ? 'Purchase was refunded'
                  : 'Purchase is pending',
            errorType: (latestPurchase.status === 'failed'
              ? 'FAILED'
              : latestPurchase.status === 'refunded'
                ? 'REFUNDED'
                : 'GENERAL') as 'FAILED' | 'REFUNDED' | 'GENERAL',
          };

          return result;
        }
      }

      const result = {
        hasPurchase: true,
        purchase: {
          id: userCompletedPurchase.id,
          productId: userCompletedPurchase.productId,
          status: userCompletedPurchase.status,
          amount: userCompletedPurchase.amount,
          currency: userCompletedPurchase.currency,
          createdAt: userCompletedPurchase.createdAt,
          updatedAt: userCompletedPurchase.updatedAt,
          paymentMethod: userCompletedPurchase.paymentMethod,
        },
      };

      return result;
    } catch (error) {
      console.error(error);
      return {
        hasPurchase: false,
        error: 'Error fetching purchase details',
      };
    }
  };

export const isProUser = async (): Promise<boolean> => {
  const purchaseDetails = await getPurchaseActionDetails();
  return (
    purchaseDetails.hasPurchase &&
    purchaseDetails.purchase?.status === 'completed'
  );
};
