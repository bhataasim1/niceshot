'use client';

import { SidebarLeft } from '@/components/sidebar-left';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { useImageStore } from '@/lib/store';
import { NavUser } from '@/components/nav-user';
import { ModeToggle } from '@/components/common/mode-toggle';
import { useUser } from '@/hooks/tanstack-query/user.hooks';

// const data = {
//   user: {
//     name: 'NiceShot',
//     email: 'm@example.com',
//     avatar: 'https://avatars.githubusercontent.com/u/71691906?v=4',
//   },
// };

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { imageName } = useImageStore();

  const { data: user, isLoading } = useUser();

  return (
    <SidebarProvider>
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
            <NavUser user={user} />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
