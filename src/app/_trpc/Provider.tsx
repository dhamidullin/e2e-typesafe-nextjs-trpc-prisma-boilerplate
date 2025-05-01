'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import React, { useState } from 'react';

import { reactClient } from '../../utils/trpc'; // Using reactClient now
import SuperJSON from 'superjson';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export function TRPCProvider(props: {
  children: React.ReactNode;
  headers?: Headers;
}) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    reactClient.createClient({ // Using reactClient here
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON, // Apply transformer here
          url: getBaseUrl() + '/api/trpc',
          headers() {
            const heads = new Map(props.headers);
            heads.set('x-trpc-source', 'react');
            return Object.fromEntries(heads);
          },
        }),
      ],
    })
  );

  return (
    <reactClient.Provider client={trpcClient} queryClient={queryClient}> {/* Using reactClient here */}
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </reactClient.Provider>
  );
} 