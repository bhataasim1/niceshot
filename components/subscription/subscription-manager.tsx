'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { formatCurrency } from '@/lib/format-currency';
import { OrderDetailsResult } from '@/types/purchase.types';
import { format } from 'date-fns';
import { Calendar, Crown, ExternalLink, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

type OrderManagerProps = {
  order: OrderDetailsResult | null;
  isProUser: boolean;
  isLoading: boolean;
};

export const OrderManager = ({
  order,
  isProUser,
  isLoading,
}: OrderManagerProps) => {
  const [isManaging, setIsManaging] = useState(false);

  const handleManageOrder = async () => {
    setIsManaging(true);
    try {
      await authClient.customer.portal({
        fetchOptions: {
          onError: () => {
            toast.error('Failed to open order portal');
          },
        },
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to open order portal');
    } finally {
      setIsManaging(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!order || !isProUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Pro Access
          </CardTitle>
          <CardDescription>{`You don't have Pro access`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Purchase Pro to unlock advanced features and remove limitations.
          </p>
          <Link href="/pricing">
            <Button>View Plans</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string, paid: boolean) => {
    if (status === 'paid' && paid) {
      return <Badge variant="default">Active</Badge>;
    } else if (status === 'pending') {
      return <Badge variant="secondary">Pending</Badge>;
    } else if (status === 'failed') {
      return <Badge variant="destructive">Failed</Badge>;
    } else if (status === 'refunded') {
      return <Badge variant="secondary">Refunded</Badge>;
    } else {
      return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Pro Access
        </CardTitle>
        <CardDescription>Manage your Pro order and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Pro Plan</p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(
                order.order?.totalAmount || 0,
                order.order?.currency || 'USD'
              )}{' '}
              (One-time payment)
            </p>
          </div>
          {getStatusBadge(
            order.order?.status || 'inactive',
            order.order?.paid || false
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Ordered on:</span>
            <span className="font-medium">
              {format(
                new Date(order.order?.createdAt || new Date()),
                'MMM d, yyyy'
              )}
            </span>
          </div>

          {order.order?.discountAmount && order.order.discountAmount > 0 && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span>
                Discount applied:{' '}
                {formatCurrency(
                  order.order.discountAmount,
                  order.order.currency
                )}
              </span>
            </div>
          )}

          {order.order?.billingName && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Billing name: {order.order.billingName}</span>
            </div>
          )}

          {order.error && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <X className="h-4 w-4" />
              <span>{order.error}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button
            onClick={handleManageOrder}
            disabled={isManaging}
            variant="outline"
            className="flex-1"
          >
            {isManaging ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
            Manage Billing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
