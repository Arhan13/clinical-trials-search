import { useState, useEffect } from "react";
import { SearchParams, SearchFilters } from "@/types/clinical-trials";
import { trpc } from "@/lib/trpc-client";

interface UseFilterPanelProps {
  onFilterChange: (params: SearchParams) => void;
  initialFilters?: SearchFilters;
}

export function useFilterPanel({
  onFilterChange,
  initialFilters = {},
}: UseFilterPanelProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [expandedSections, setExpandedSections] = useState<{
    phase: boolean;
    status: boolean;
    studyType: boolean;
  }>({
    phase: false,
    status: false,
    studyType: false,
  });

  // Sync filters state when initialFilters prop changes
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Use tRPC query for filter options with proper hydration
  const { data: filterOptions, isLoading: loading } =
    trpc.clinicalTrials.getFilterOptions.useQuery(undefined, {
      // This will use the prefetched data from the server
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  const handleFilterChange = (
    filterType: keyof SearchFilters,
    value: string | string[]
  ) => {
    console.log("handleFilterChange called:", { filterType, value });
    const newFilters = { ...filters, [filterType]: value };
    console.log("New filters:", newFilters);
    setFilters(newFilters);
    console.log("Calling onFilterChange with filters:", newFilters);
    onFilterChange({ filters: newFilters });
  };

  const handleMultiSelectChange = (
    filterType: keyof SearchFilters,
    value: string,
    checked: boolean
  ) => {
    console.log("handleMultiSelectChange called:", {
      filterType,
      value,
      checked,
    });
    const currentValues = (filters[filterType] as string[]) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    console.log("Current values:", currentValues, "New values:", newValues);

    if (newValues.length > 0) {
      handleFilterChange(filterType, newValues);
    } else {
      const newFilters = { ...filters };
      delete newFilters[filterType];
      setFilters(newFilters);
      console.log("Calling onFilterChange with empty filters:", newFilters);
      onFilterChange({ filters: newFilters });
    }
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({ filters: {} });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(
      (value) =>
        value !== undefined &&
        value !== null &&
        (Array.isArray(value) ? value.length > 0 : value !== "")
    ).length;
  };

  const removeFilter = (filterType: keyof SearchFilters) => {
    const newFilters = { ...filters };
    delete newFilters[filterType];
    setFilters(newFilters);
    onFilterChange({ filters: newFilters });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getVisibleItems = (
    items: string[],
    section: keyof typeof expandedSections,
    defaultCount: number = 4
  ) => {
    return expandedSections[section] ? items : items.slice(0, defaultCount);
  };

  return {
    // Data
    filters,
    filterOptions,
    loading,
    expandedSections,

    // Computed values
    activeFiltersCount: getActiveFiltersCount(),

    // Handlers
    handleFilterChange,
    handleMultiSelectChange,
    clearFilters,
    removeFilter,
    toggleSection,
    getVisibleItems,
  };
}
