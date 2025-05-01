'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { reactClient, trpcClientOptions } from '../../utils/trpc';

interface TRPCProviderProps {
  children: React.ReactNode;
  headers?: Headers;
}

const TRPCProvider: React.FC<TRPCProviderProps> = (props) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => reactClient.createClient(trpcClientOptions));

  return (
    <reactClient.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </reactClient.Provider>
  );
}

export default TRPCProvider;
