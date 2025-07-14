import { SearchParams } from "@/types/clinical-trials";
import { prefetchClinicalTrialsData } from "@/lib/server-data-loader";
import { ClinicalTrialsSearchClient } from "@/components/clinical-trials-search-client";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { CardSkeleton } from "@/components/skeletons";

interface ServerSearchHandlerProps {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    phase?: string;
    status?: string;
    studyType?: string;
    sponsor?: string;
    condition?: string;
    intervention?: string;
  };
}

/**
 * Server component that handles URL-based search parameters
 * for optimal SSR performance with search state
 */
export async function ServerSearchHandler({
  searchParams,
}: ServerSearchHandlerProps) {
  // Parse URL search parameters
  const parsedParams: SearchParams = {
    query: searchParams?.query || "",
    page: searchParams?.page ? parseInt(searchParams.page) : 1,
    limit: searchParams?.limit ? parseInt(searchParams.limit) : 20,
    sortBy: searchParams?.sortBy,
    sortOrder: searchParams?.sortOrder,
    filters: {
      phase: searchParams?.phase ? searchParams.phase.split(",") : undefined,
      status: searchParams?.status ? searchParams.status.split(",") : undefined,
      studyType: searchParams?.studyType
        ? searchParams.studyType.split(",")
        : undefined,
      sponsor: searchParams?.sponsor,
      condition: searchParams?.condition,
      intervention: searchParams?.intervention,
    },
  };

  // Prefetch data on the server based on URL parameters
  const { dehydratedState, initialData } = await prefetchClinicalTrialsData(
    parsedParams
  );

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<CardSkeleton />}>
        <ClinicalTrialsSearchClient
          initialSearchParams={parsedParams}
          initialData={initialData}
        />
      </Suspense>
    </HydrationBoundary>
  );
}
