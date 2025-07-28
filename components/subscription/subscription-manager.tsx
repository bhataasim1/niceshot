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
import { PurchaseDetailsResult } from '@/types/purchase.types';
import { format } from 'date-fns';
import { Calendar, Crown, ExternalLink, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

type PurchaseManagerProps = {
  purchase: PurchaseDetailsResult | null;
  isProUser: boolean;
  isLoading: boolean;
};

export const PurchaseManager = ({
  purchase,
  isProUser,
  isLoading,
}: PurchaseManagerProps) => {
  const [isManaging, setIsManaging] = useState(false);

  const handleManagePurchase = async () => {
    setIsManaging(true);
    try {
      await authClient.customer.portal({
        fetchOptions: {
          onError: () => {
            toast.error('Failed to open purchase portal');
          },
        },
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to open purchase portal');
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

  if (!purchase || !isProUser) {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'refunded':
        return <Badge variant="secondary">Refunded</Badge>;
      default:
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
        <CardDescription>Manage your Pro purchase and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Pro Plan</p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(
                purchase.purchase?.amount || 0,
                purchase.purchase?.currency || 'USD'
              )}{' '}
              (One-time payment)
            </p>
          </div>
          {getStatusBadge(purchase.purchase?.status || 'inactive')}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Purchased on:</span>
            <span className="font-medium">
              {format(
                new Date(purchase.purchase?.createdAt || new Date()),
                'MMM d, yyyy'
              )}
            </span>
          </div>

          {purchase.purchase?.paymentMethod && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Payment method: {purchase.purchase.paymentMethod}</span>
            </div>
          )}

          {purchase.error && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <X className="h-4 w-4" />
              <span>{purchase.error}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button
            onClick={handleManagePurchase}
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
