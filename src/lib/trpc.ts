import { initTRPC } from "@trpc/server";
import { type NextRequest } from "next/server";
import superjson from "superjson";

// Create context for tRPC
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  return {
    req: opts.req,
  };
};

// Initialize tRPC
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
