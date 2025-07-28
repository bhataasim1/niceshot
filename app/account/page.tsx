'use client';

import { UserCard } from '@/components/account/user-card';
import { PurchaseManager } from '@/components/subscription/subscription-manager';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCurrentUserWithPurchase } from '@/hooks/tanstack-query/user.hooks';
import { CreditCard, Settings, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { data: userWithPurchase, isLoading } = useCurrentUserWithPurchase();

  return (
    <div className="container mx-auto px-4 py-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and Pro purchase settings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <UserCard
              user={userWithPurchase?.user || null}
              isLoading={isLoading}
            />
          </div>

          <div className="md:col-span-2">
            <PurchaseManager
              purchase={userWithPurchase?.purchase || null}
              isProUser={userWithPurchase?.isProUser || false}
              isLoading={isLoading}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common account management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                asChild
                className="h-auto p-4 flex-col gap-2"
              >
                <Link href="/pricing">
                  <CreditCard className="h-5 w-5" />
                  <span>View Plans</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-auto p-4 flex-col gap-2"
              >
                <Link href="/editor">
                  <Settings className="h-5 w-5" />
                  <span>Go to Editor</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-auto p-4 flex-col gap-2"
              >
                <Link href="/privacy">
                  <Shield className="h-5 w-5" />
                  <span>Privacy Policy</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
