"use client";

import { useState, useEffect } from "react";
import { SearchParams, SearchResult } from "@/types/clinical-trials";
import SearchForm from "@/components/search-form";
import FilterPanel from "@/components/filter-panel";
import { ClinicalTrialsDataTable } from "@/components/clinical-trials-data-table";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface ClinicalTrialsSearchClientProps {
  initialSearchParams?: SearchParams;
  initialData?: SearchResult;
}

export function ClinicalTrialsSearchClient({
  initialSearchParams = { query: "", page: 1, limit: 20 },
  initialData,
}: ClinicalTrialsSearchClientProps) {
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);

  // Track searchParams changes
  useEffect(() => {
    console.log(
      "📊 searchParams changed:",
      JSON.stringify(searchParams, null, 2)
    );
  }, [searchParams]);

  const handleSearch = (params: SearchParams) => {
    console.log("🔍 handleSearch - query:", params.query || "(empty)");
    setError(null);
    setSearchParams((prevParams) => {
      const newParams = { ...prevParams, ...params };
      return newParams;
    });
  };

  // Always show results - empty query shows all trials
  const hasSearched = true;

  return (
    <div className="flex gap-6">
      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-4">
          <FilterPanel
            onFilterChange={handleSearch}
            currentFilters={searchParams.filters}
          />
        </div>
      </aside>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden w-full">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="mb-4"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        {showMobileFilters && (
          <div className="mb-6">
            <FilterPanel
              onFilterChange={handleSearch}
              currentFilters={searchParams.filters}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="mb-6 lg:block hidden">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Mobile Search */}
        <div className="mb-6 lg:hidden">
          <SearchForm onSearch={handleSearch} />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <X className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {hasSearched && (
          <ClinicalTrialsDataTable
            searchParams={searchParams}
            onSearch={handleSearch}
            initialData={initialData}
          />
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No search performed yet
            </h3>
            <p className="text-gray-500">
              Enter a search term or use filters to find clinical trials
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
