"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "@/lib/trpc-client";
import { getQueryClient } from "@/lib/get-query-client";
import superjson from "superjson";

export function Providers({ children }: { children: React.ReactNode }) {
  // Use the proper query client factory
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
          }/api/trpc`,
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
