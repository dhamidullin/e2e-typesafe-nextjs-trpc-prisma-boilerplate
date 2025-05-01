import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/api/root';
import { createTRPCContext } from '../../../server/api/trpc';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: ({ path, error }) => {
    console.error(
      `❌ tRPC failed on ${path ?? 'unknown path'}: ${error.message}`,
    );
  },
});
