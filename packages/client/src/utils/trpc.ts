import { createTRPCReact } from "@trpc/react-query";
import { getFetch } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
// import { loggerLink } from "@trpc/client/links/loggerLink";

import type { AppRouter } from "server";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    // loggerLink(),
    httpBatchLink({
      url: "http://localhost:1234/api/trpc",
      fetch: async (input, init?) => {
        const fetch = getFetch();
        return fetch(input, {
          ...init,
          // credentials: "include",
        });
      },
    }),
  ],
});

export const TrpcProvider = trpc.Provider;
