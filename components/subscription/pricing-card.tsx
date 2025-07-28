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
import { envClient } from '@/env/client';
import { useCurrentUserWithPurchase } from '@/hooks/tanstack-query/user.hooks';
import { authClient } from '@/lib/auth-client';
import { formatCurrency } from '@/lib/format-currency';
import { Check, Crown, Loader2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: string;
    description: string;
    features: string[];
    popular?: boolean;
  };
}

export const PricingCard = ({ plan }: PricingCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [managePurchaseLoading, setManagePurchaseLoading] =
    useState<boolean>(false);
  const { data: userWithPurchase } = useCurrentUserWithPurchase();
  const router = useRouter();

  const handlePurchase = async () => {
    if (!userWithPurchase?.user) {
      router.push('/sign-in');
      return;
    }

    setIsLoading(true);
    try {
      await authClient.checkout({
        products: [plan.id],
        slug: envClient.NEXT_PUBLIC_POLAR_PRODUCT_PRO_SLUG,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to create checkout session');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManagePurchase = async () => {
    setManagePurchaseLoading(true);
    try {
      await authClient.customer.portal({
        fetchOptions: {
          onError: () => {
            toast.error('Failed to redirect to purchase portal');
          },
        },
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to redirect to purchase portal');
    } finally {
      setManagePurchaseLoading(false);
    }
  };

  const isProUser = userWithPurchase?.isProUser;

  return (
    <Card
      className={`relative ${plan.popular ? 'border-primary shadow-lg md:w-[400px]' : ''}`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 font-mono">
          <Badge variant="default" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="font-mono">
        <CardTitle className="flex items-center gap-2">
          {plan.popular && <Crown className="h-5 w-5 text-primary" />}
          {plan.name}
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">
            {formatCurrency(plan.price, plan.currency)}
          </span>
          <span className="text-muted-foreground">/{plan.interval}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 font-mono">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          onClick={isProUser ? handleManagePurchase : handlePurchase}
          disabled={isLoading}
          className="w-full font-mono"
          variant={plan.popular ? 'default' : 'outline'}
        >
          {isLoading || managePurchaseLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isProUser ? (
            'Manage Purchase'
          ) : (
            'Purchase Now'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
