'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useImageStore } from '@/lib/store';
import { Upload } from 'lucide-react';
import { StyleTabs } from './style-tabs';
import { NavUser } from './nav-user';
import { Button } from './ui/button';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { uploadedImageUrl, exportImage } = useImageStore();

  const handleExport = async () => {
    try {
      await exportImage();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <Button
          onClick={handleExport}
          disabled={!uploadedImageUrl}
          className="w-full"
          variant={uploadedImageUrl ? 'default' : 'secondary'}
        >
          <Upload className="size-4 mr-2" />
          Export Image
        </Button>
      </SidebarHeader>
      <SidebarContent className="space-y-6">
        <StyleTabs />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
