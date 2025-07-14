import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc";
import { searchClinicalTrials, getFilterOptions } from "@/lib/data-loader";

export const clinicalTrialsRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        sortBy: z
          .enum([
            "nct-id",
            "title",
            "status",
            "phase",
            "sponsor",
            "studyType",
            "enrollment",
            "startDate",
          ])
          .optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        phase: z.array(z.string()).optional(),
        status: z.array(z.string()).optional(),
        studyType: z.array(z.string()).optional(),
        sponsor: z.string().optional(),
        condition: z.string().optional(),
        intervention: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      console.log("🚀 tRPC search:", input.query || "(empty)");

      const {
        query = "",
        page = 1,
        limit = 20,
        sortBy,
        sortOrder,
        phase,
        status,
        studyType,
        sponsor,
        condition,
        intervention,
      } = input;

      const filters = {
        phase,
        status,
        studyType,
        sponsor,
        condition,
        intervention,
      };

      // Remove undefined values from filters
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== undefined)
      );

      const results = searchClinicalTrials({
        query,
        page,
        limit,
        sortBy,
        sortOrder,
        filters: cleanFilters,
      });

      return results;
    }),

  getFilterOptions: publicProcedure.query(async () => {
    const filterOptions = getFilterOptions();
    return filterOptions;
  }),
});
