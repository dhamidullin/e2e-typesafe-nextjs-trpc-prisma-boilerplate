import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return "pong";
  }),
});
