import { dehydrate } from "@tanstack/react-query";
import { SearchParams } from "@/types/clinical-trials";
import { searchClinicalTrials, getFilterOptions } from "@/lib/data-loader";
import { getServerQueryClient } from "@/lib/get-query-client";

// Server-side data prefetcher for SSR with proper hydration
export async function prefetchClinicalTrialsData(
  searchParams: SearchParams = {
    query: "",
    page: 1,
    limit: 20,
  }
) {
  const queryClient = getServerQueryClient();

  // Convert SearchParams to tRPC input format to match client queries
  const trpcInput = {
    query: searchParams.query || "",
    page: searchParams.page || 1,
    limit: searchParams.limit || 20,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
    phase: searchParams.filters?.phase,
    status: searchParams.filters?.status,
    studyType: searchParams.filters?.studyType,
    sponsor: searchParams.filters?.sponsor,
    condition: searchParams.filters?.condition,
    intervention: searchParams.filters?.intervention,
  };

  // Fetch the initial data first
  const initialData = await searchClinicalTrials(searchParams);
  const filterOptions = await getFilterOptions();

  // Prefetch initial clinical trials data with tRPC-compatible query key
  await queryClient.prefetchQuery({
    queryKey: [
      ["clinicalTrials", "search"],
      {
        input: trpcInput,
        type: "query",
      },
    ],
    queryFn: () => initialData,
    staleTime: 60 * 1000, // 1 minute
  });

  // Prefetch filter options with tRPC-compatible query key
  await queryClient.prefetchQuery({
    queryKey: [
      ["clinicalTrials", "getFilterOptions"],
      {
        input: undefined,
        type: "query",
      },
    ],
    queryFn: () => filterOptions,
    staleTime: 5 * 60 * 1000, // 5 minutes - filters don't change often
  });

  return {
    dehydratedState: dehydrate(queryClient),
    initialData,
    filterOptions,
  };
}

// Server-side search function for API routes
export async function serverSearchClinicalTrials(searchParams: SearchParams) {
  return searchClinicalTrials(searchParams);
}

// Server-side filter options fetcher
export async function getServerFilterOptions() {
  return getFilterOptions();
}
