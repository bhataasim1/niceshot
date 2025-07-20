import { SidebarRight } from '@/components/sidebar-right';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarInset>{children}</SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
