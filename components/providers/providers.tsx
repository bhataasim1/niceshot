'use client';

import { FC, ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from './theme-provider';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  );
};

export default Providers;
