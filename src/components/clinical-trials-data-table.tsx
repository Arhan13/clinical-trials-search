"use client";

import { SearchParams, SearchResult } from "@/types/clinical-trials";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClinicalTrialsTable } from "@/hooks";
import { CardSkeleton } from "@/components/skeletons";

interface ClinicalTrialsDataTableProps {
  searchParams: SearchParams;
  onSearch: (params: SearchParams) => void;
  initialData?: SearchResult;
}

export function ClinicalTrialsDataTable({
  searchParams,
  onSearch,
  initialData,
}: ClinicalTrialsDataTableProps) {
  const {
    results,
    loading,
    pageSize,
    sorting,
    columns,
    handlePageChange,
    handlePageSizeChange,
  } = useClinicalTrialsTable({ searchParams, onSearch, initialData });

  // Use initial data if available and results are still loading
  const displayResults = results || initialData;

  if (!displayResults) {
    return <CardSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Clinical Trials Results</span>
          <div className="text-sm text-muted-foreground font-normal">
            {displayResults.totalCount} total results
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={displayResults.trials}
          totalCount={displayResults.totalCount}
          currentPage={displayResults.page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSortingChange={() => {}} // This will be handled by column headers
          sorting={sorting}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
