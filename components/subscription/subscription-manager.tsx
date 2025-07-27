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
import { SubscriptionDetailsResult } from '@/types/subscription.types';
import { format } from 'date-fns';
import { Calendar, Crown, ExternalLink, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

type SubscriptionManagerProps = {
  subscription: SubscriptionDetailsResult | null;
  isProUser: boolean;
  isLoading: boolean;
};

export const SubscriptionManager = ({
  subscription,
  isProUser,
  isLoading,
}: SubscriptionManagerProps) => {
  const [isManaging, setIsManaging] = useState(false);

  const handleManageSubscription = async () => {
    setIsManaging(true);
    try {
      await authClient.customer.portal({
        fetchOptions: {
          onError: () => {
            toast.error('Failed to open subscription portal');
          },
        },
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to open subscription portal');
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

  if (!subscription || !isProUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Subscription
          </CardTitle>
          <CardDescription>
            {`You don't have an active subscription`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Upgrade to Pro to unlock advanced features and remove limitations.
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
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'trialing':
        return <Badge variant="secondary">Trial</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Past Due</Badge>;
      case 'canceled':
        return <Badge variant="secondary">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Subscription
        </CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Pro Plan</p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(
                subscription.subscription?.amount || 0,
                subscription.subscription?.currency || 'USD'
              )}{' '}
              / {subscription.subscription?.recurringInterval}
            </p>
          </div>
          {getStatusBadge(subscription.subscription?.status || 'inactive')}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Current period:</span>
            <span className="font-medium">
              {format(
                new Date(
                  subscription.subscription?.currentPeriodStart || new Date()
                ),
                'MMM d, yyyy'
              )}{' '}
              -{' '}
              {format(
                new Date(
                  subscription.subscription?.currentPeriodEnd || new Date()
                ),
                'MMM d, yyyy'
              )}
            </span>
          </div>

          {subscription.subscription?.cancelAtPeriodEnd && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <X className="h-4 w-4" />
              <span>Will cancel at period end</span>
            </div>
          )}

          {subscription.subscription?.canceledAt && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Canceled on{' '}
                {format(
                  new Date(subscription.subscription?.canceledAt || new Date()),
                  'MMM d, yyyy'
                )}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button
            onClick={handleManageSubscription}
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
