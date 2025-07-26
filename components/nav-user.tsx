'use client';

import { CreditCard, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { User } from '@/prisma/generated/prisma';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const NavUser = memo(({ user }: { user: User | null | undefined }) => {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="p-0">
              <Avatar>
                <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
                <AvatarFallback className="rounded-lg">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={async () => await authClient.customer.portal()}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onRequest: () => {
                      toast.loading('Signing out...');
                    },
                    onSuccess: () => {
                      localStorage.clear();
                      toast.success('Signed out successfully');
                      toast.dismiss();
                      router.push('/');
                    },
                    onError: () => {
                      toast.error('Failed to sign out');
                      router.push('/');
                    },
                  },
                })
              }
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

NavUser.displayName = 'NavUser';

export { NavUser };
