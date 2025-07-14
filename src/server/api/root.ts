import { createTRPCRouter } from "@/lib/trpc";
import { clinicalTrialsRouter } from "./routers/clinical-trials";

export const appRouter = createTRPCRouter({
  clinicalTrials: clinicalTrialsRouter,
});

export type AppRouter = typeof appRouter;
