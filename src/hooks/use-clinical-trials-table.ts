import { useState, useMemo, useCallback, useEffect } from "react";
import { SortingState } from "@tanstack/react-table";
import { SearchParams, SearchResult } from "@/types/clinical-trials";
import { trpc } from "@/lib/trpc-client";
import { createColumns } from "@/components/clinical-trials-columns";

interface UseClinicalTrialsTableProps {
  searchParams: SearchParams;
  onSearch: (params: SearchParams) => void;
  initialData?: SearchResult;
}

export function useClinicalTrialsTable({
  searchParams,
  onSearch,
  initialData,
}: UseClinicalTrialsTableProps) {
  const [pageSize, setPageSize] = useState(searchParams.limit || 20);

  // Convert SearchParams to tRPC input format
  const trpcInput = useMemo(() => {
    const input = {
      query: searchParams.query || "",
      page: searchParams.page || 1,
      limit: pageSize,
      sortBy: searchParams.sortBy as
        | "nct-id"
        | "title"
        | "status"
        | "phase"
        | "sponsor"
        | "studyType"
        | "enrollment"
        | "startDate"
        | undefined,
      sortOrder: searchParams.sortOrder,
      phase: searchParams.filters?.phase,
      status: searchParams.filters?.status,
      studyType: searchParams.filters?.studyType,
      sponsor: searchParams.filters?.sponsor,
      condition: searchParams.filters?.condition,
      intervention: searchParams.filters?.intervention,
    };
    return input;
  }, [searchParams, pageSize]);

  // Check if we have any active filters or search query
  const hasActiveFilters = useMemo(() => {
    // Check if there's a search query
    if (searchParams.query && searchParams.query.trim() !== "") {
      return true;
    }

    // Check if there are any filters
    if (!searchParams.filters) return false;
    return Object.values(searchParams.filters).some(
      (value) =>
        value !== undefined &&
        value !== null &&
        (Array.isArray(value) ? value.length > 0 : true)
    );
  }, [searchParams.query, searchParams.filters]);

  // Use tRPC query with proper query key that matches server prefetching
  const { data: results, isLoading: loading } =
    trpc.clinicalTrials.search.useQuery(trpcInput, {
      // This will use the prefetched data from the server for hydration
      staleTime: 60 * 1000, // 1 minute
      initialData:
        initialData && searchParams.page === 1 && !hasActiveFilters
          ? initialData
          : undefined,
    });

  // Debug the results when they change
  useEffect(() => {
    if (results) {
      console.log(
        "🔍 Results:",
        results.trials.length,
        "of",
        results.totalCount
      );
    }
  }, [results, trpcInput.query]);

  // Debug the hook state
  console.log("🔍 Loading:", loading, "| Query:", trpcInput.query || "(empty)");

  // Event handlers
  const handlePageChange = (page: number) => {
    onSearch({
      ...searchParams,
      page,
      limit: pageSize,
    });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    onSearch({
      ...searchParams,
      page: 1,
      limit: newPageSize,
    });
  };

  const handleSortingChange = useCallback(
    (sortBy: string, sortOrder: "asc" | "desc") => {
      onSearch({
        ...searchParams,
        page: 1,
        sortBy,
        sortOrder,
      });
    },
    [onSearch, searchParams]
  );

  // Create sorting state for TanStack Table
  const sorting: SortingState = useMemo(() => {
    if (searchParams.sortBy && searchParams.sortOrder) {
      return [
        {
          id: searchParams.sortBy,
          desc: searchParams.sortOrder === "desc",
        },
      ];
    }
    return [];
  }, [searchParams.sortBy, searchParams.sortOrder]);

  // Create columns with sorting handlers
  const columns = useMemo(
    () =>
      createColumns(
        handleSortingChange,
        searchParams.sortBy,
        searchParams.sortOrder
      ),
    [handleSortingChange, searchParams.sortBy, searchParams.sortOrder]
  );

  return {
    // Data
    results,
    loading,
    pageSize,
    sorting,
    columns,

    // Handlers
    handlePageChange,
    handlePageSizeChange,
  };
}
