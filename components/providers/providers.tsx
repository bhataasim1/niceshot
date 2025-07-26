'use client';

import { FC, ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from './theme-provider';
import { TanStackQueryProvider } from './tanstack-query-provider';
import { ToolTipProvider } from './tool-tip-provider';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TanStackQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToolTipProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </ToolTipProvider>
      </ThemeProvider>
    </TanStackQueryProvider>
  );
};

export default Providers;
