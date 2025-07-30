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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCurrentUserWithOrder } from '@/hooks/tanstack-query/user.hooks';
import { useImageStore } from '@/lib/store';
import { Trash2, X } from 'lucide-react';

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { imageName, clearImage } = useImageStore();

  const { data: userWithOrder, isLoading } = useCurrentUserWithOrder();

  const handleDeleteImage = () => {
    clearImage();
  };

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
                  <div className="flex items-center gap-2">
                    <BreadcrumbPage className="line-clamp-1">
                      {imageName || 'No image uploaded'}
                    </BreadcrumbPage>
                    {imageName && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="size-7"
                            onClick={handleDeleteImage}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete image and upload new one</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
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
                user={userWithOrder?.user}
                isProUser={userWithOrder?.isProUser}
              />
            )}
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
