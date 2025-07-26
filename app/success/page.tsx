'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUserWithSubscription } from '@/hooks/tanstack-query/user.hooks';

interface SuccessPageProps {
  searchParams: {
    checkout_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { data: userWithSubscription, isLoading } =
    useCurrentUserWithSubscription();

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
