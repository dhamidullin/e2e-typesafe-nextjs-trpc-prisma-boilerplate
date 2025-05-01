/**
 * This is the client-side entrypoint for your tRPC API.
 * It is used to create the `api` object which contains the Next.js App-wrapper
 * as well as your typesafe react-query hooks.
 *
 * We pull utilities from the "." entrypoint (default) rather than "@trpc/react-query/next"
 * because we want to use the React optimization feature "experimental_useOptimistic"
 */
import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '../server/api/root';
import superjson from 'superjson';
import { httpBatchLink, loggerLink, createTRPCClient } from '@trpc/client';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/** A set of typesafe React hooks for consuming your tRPC API. */
export const reactClient = createTRPCReact<AppRouter>({});

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in `_app.tsx`
 */
export type { TRPCProvider } from "@trpc/react-query/shared";

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = AppRouter['_def']['record'];

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = AppRouter['_def']['record'];

/**
 * Client-side tRPC configuration shared by hooks and vanilla client
 */
export const trpcClientOptions = {
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      transformer: superjson,
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
};

/** Create a vanilla tRPC client for non-hook usage */
export const vanillaClient = createTRPCClient<AppRouter>(trpcClientOptions); 