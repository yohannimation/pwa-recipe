'use client';

import { useState } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ApiError } from '@/lib/api/client';
import { meKey } from '@/lib/api/auth';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    const queryClient: QueryClient = new QueryClient({
      defaultOptions: { queries: { retry: (n, error) => !(error instanceof ApiError && error.status < 500) && n < 2 } },
      queryCache: new QueryCache({
        // Refresh failed on a protected request => session lost
        onError: (error, query) => {
          if (error instanceof ApiError && error.status === 401 && query.queryKey[1] !== 'me') {
            queryClient.setQueryData(meKey, null);
          }
        },
      }),
    });
    return queryClient;
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}