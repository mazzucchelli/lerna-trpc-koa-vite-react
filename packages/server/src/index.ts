import Koa from "koa";
import { createKoaMiddleware } from "trpc-koa-adapter";
import cors from "@koa/cors";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

export type AppRouter = typeof appRouter;

const t = initTRPC.create();
const appRouter = t.router({
  greeting: t.procedure
    .input(
      z.object({
        name: z.string(),
      }).optional()
    )
    .query(({ input }) => {
      return {
        text: `Hello ${input?.name ?? "world"}`,
      };
    }),
});

const app = new Koa();

app.use(cors());

const adapter = createKoaMiddleware({
  router: appRouter,
  prefix: "/api/trpc",
});

app.use(adapter);

app.listen(4001);
