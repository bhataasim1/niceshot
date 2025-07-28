'use server';
import { getUser } from '@/lib/auth-utils';
import { Order } from '@/prisma/generated/prisma';
import prisma from '@/prisma/prisma';
import { BillingAddress, OrderDetailsResult } from '@/types/purchase.types';

export const getOrderActionDetails = async (): Promise<OrderDetailsResult> => {
  try {
    const user = await getUser();
    if (!user) {
      return { hasOrder: false, error: 'User not found' };
    }

    const userOrders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!userOrders.length) {
      return { hasOrder: false, error: 'No orders found' };
    }

    const userPaidOrder: Order = userOrders
      .filter((order) => order.status === 'paid' && order.paid === true)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

    if (!userPaidOrder) {
      const latestOrder = userOrders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      if (latestOrder) {
        const result = {
          hasOrder: true,
          order: {
            id: latestOrder.id,
            productId: latestOrder.productId,
            status: latestOrder.status,
            paid: latestOrder.paid,
            amount: latestOrder.amount,
            totalAmount: latestOrder.totalAmount,
            currency: latestOrder.currency,
            billingReason: latestOrder.billingReason,
            createdAt: latestOrder.createdAt,
            modifiedAt: latestOrder.modifiedAt,
            discountAmount: latestOrder.discountAmount,
            discountId: latestOrder.discountId,
            billingName: latestOrder.billingName,
            billingAddress: latestOrder.billingAddress as BillingAddress,
          },
          error:
            latestOrder.status === 'failed'
              ? 'Order failed'
              : latestOrder.status === 'refunded'
                ? 'Order was refunded'
                : !latestOrder.paid
                  ? 'Order is pending payment'
                  : 'Order is not active',
          errorType: (latestOrder.status === 'failed'
            ? 'FAILED'
            : latestOrder.status === 'refunded'
              ? 'REFUNDED'
              : 'GENERAL') as 'FAILED' | 'REFUNDED' | 'GENERAL',
        };

        return result;
      }
    }

    const result = {
      hasOrder: true,
      order: {
        id: userPaidOrder.id,
        productId: userPaidOrder.productId,
        status: userPaidOrder.status,
        paid: userPaidOrder.paid,
        amount: userPaidOrder.amount,
        totalAmount: userPaidOrder.totalAmount,
        currency: userPaidOrder.currency,
        billingReason: userPaidOrder.billingReason,
        createdAt: userPaidOrder.createdAt,
        modifiedAt: userPaidOrder.modifiedAt,
        discountAmount: userPaidOrder.discountAmount,
        discountId: userPaidOrder.discountId,
        billingName: userPaidOrder.billingName,
        billingAddress: userPaidOrder.billingAddress as BillingAddress,
      },
    };

    return result;
  } catch (error) {
    console.error(error);
    return {
      hasOrder: false,
      error: 'Error fetching order details',
    };
  }
};

export const isProUser = async (): Promise<boolean> => {
  const orderDetails = await getOrderActionDetails();
  return (
    orderDetails.hasOrder &&
    orderDetails.order?.status === 'paid' &&
    orderDetails.order?.paid === true
  );
};
