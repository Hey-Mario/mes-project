'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import React from 'react';

const queryClient = new QueryClient();

export function AppRoot({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        {children}
      </Theme>
    </QueryClientProvider>
  );
}