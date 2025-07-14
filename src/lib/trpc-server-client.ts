import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@/server/api/root";
import superjson from "superjson";

// Create a server-side tRPC client for prefetching
export const serverTrpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/trpc`,
      transformer: superjson,
    }),
  ],
});
