'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUserWithSubscription } from '@/hooks/tanstack-query/user.hooks';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const { data: userWithSubscription, isLoading } =
    useCurrentUserWithSubscription();

  const searchParams = useSearchParams();

  const checkout_id = searchParams.get('checkout_id');

  console.log(checkout_id);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Skeleton className="h-10 w-full rounded-full" />
      ) : (
        <h1>Success {userWithSubscription?.user?.name}</h1>
      )}
    </div>
  );
}
