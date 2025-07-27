'use client';

import { ModeToggle } from '@/components/common/mode-toggle';
import { NavUser } from '@/components/nav-user';
import { SidebarLeft } from '@/components/sidebar-left';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUserWithSubscription } from '@/hooks/tanstack-query/user.hooks';
import { useImageStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { imageName } = useImageStore();

  const { data: userWithSubscription, isLoading } =
    useCurrentUserWithSubscription();

  useEffect(() => {
    if (!userWithSubscription?.isProUser && !isLoading) {
      toast.error('You need to be a pro user to access this page');
      router.push('/pricing');
    }
  }, [userWithSubscription?.isProUser, router, isLoading]);

  return (
    <SidebarProvider className="font-mono">
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 border-b z-10">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    {imageName || 'No image uploaded'}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-3">
            <ModeToggle />
            {isLoading ? (
              <Skeleton className="size-8 rounded-full" />
            ) : (
              <NavUser
                user={userWithSubscription?.user}
                isProUser={userWithSubscription?.isProUser}
              />
            )}
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
