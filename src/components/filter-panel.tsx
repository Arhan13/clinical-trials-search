"use client";

import { SearchParams, SearchFilters } from "@/types/clinical-trials";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { Filter, X } from "lucide-react";
import { formatStatus, formatPhase } from "@/lib/format-utils";
import { useFilterPanel } from "@/hooks";
import { FilterSkeleton } from "@/components/skeletons";

interface FilterPanelProps {
  onFilterChange: (params: SearchParams) => void;
  currentFilters?: SearchFilters;
}

export default function FilterPanel({
  onFilterChange,
  currentFilters,
}: FilterPanelProps) {
  const {
    filters,
    filterOptions,
    loading,
    activeFiltersCount,
    expandedSections,
    handleFilterChange,
    handleMultiSelectChange,
    clearFilters,
    removeFilter,
    toggleSection,
    getVisibleItems,
  } = useFilterPanel({ onFilterChange, initialFilters: currentFilters });

  // Debug: Log the actual filter options
  if (filterOptions) {
    console.log("🔍 Filter options loaded:", {
      statuses: filterOptions.statuses,
      phases: filterOptions.phases,
      studyTypes: filterOptions.studyTypes,
    });
  }

  if (loading) {
    return <FilterSkeleton />;
  }

  if (!filterOptions) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <X className="h-4 w-4" />
            Failed to load filters
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={activeFiltersCount === 0}
            className="h-auto p-1 text-xs"
          >
            Clear all
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              Active Filters
            </Label>
            <div className="flex flex-wrap gap-1">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0))
                  return null;

                // Format the display value based on the filter type
                let displayValue: string;
                if (Array.isArray(value)) {
                  if (key === "status") {
                    displayValue = value.map(formatStatus).join(", ");
                  } else if (key === "phase") {
                    displayValue = value.map(formatPhase).join(", ");
                  } else {
                    displayValue = value.join(", ");
                  }
                } else {
                  displayValue = value;
                }

                return (
                  <Badge
                    key={key}
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    {key}: {displayValue}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => removeFilter(key as keyof SearchFilters)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
            <Separator />
          </div>
        )}

        {/* Phase Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Phase</Label>
          <div className="rounded-md border p-2">
            <div className="space-y-1">
              {getVisibleItems(filterOptions.phases, "phase").map((phase) => (
                <div key={phase} className="flex items-center space-x-2">
                  <Checkbox
                    id={`phase-${phase}`}
                    checked={(filters.phase || []).includes(phase)}
                    onCheckedChange={(checked) =>
                      handleMultiSelectChange(
                        "phase",
                        phase,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`phase-${phase}`}
                    className="text-xs font-normal cursor-pointer"
                  >
                    {formatPhase(phase)}
                  </Label>
                </div>
              ))}
            </div>
            {filterOptions.phases.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection("phase")}
                className="h-auto p-1 mt-2 text-xs text-muted-foreground hover:text-foreground"
              >
                {expandedSections.phase
                  ? "Show less"
                  : `Show ${filterOptions.phases.length - 4} more`}
              </Button>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Status</Label>
          <div className="rounded-md border p-2">
            <div className="space-y-1">
              {getVisibleItems(filterOptions.statuses, "status").map(
                (status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={(filters.status || []).includes(status)}
                      onCheckedChange={(checked) =>
                        handleMultiSelectChange(
                          "status",
                          status,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`status-${status}`}
                      className="text-xs font-normal cursor-pointer"
                    >
                      {formatStatus(status)}
                    </Label>
                  </div>
                )
              )}
            </div>
            {filterOptions.statuses.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection("status")}
                className="h-auto p-1 mt-2 text-xs text-muted-foreground hover:text-foreground"
              >
                {expandedSections.status
                  ? "Show less"
                  : `Show ${filterOptions.statuses.length - 4} more`}
              </Button>
            )}
          </div>
        </div>

        {/* Study Type Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Study Type</Label>
          <div className="rounded-md border p-2">
            <div className="space-y-1">
              {getVisibleItems(filterOptions.studyTypes, "studyType").map(
                (type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`study-type-${type}`}
                      checked={(filters.studyType || []).includes(type)}
                      onCheckedChange={(checked) =>
                        handleMultiSelectChange(
                          "studyType",
                          type,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`study-type-${type}`}
                      className="text-xs font-normal cursor-pointer"
                    >
                      {type}
                    </Label>
                  </div>
                )
              )}
            </div>
            {filterOptions.studyTypes.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection("studyType")}
                className="h-auto p-1 mt-2 text-xs text-muted-foreground hover:text-foreground"
              >
                {expandedSections.studyType
                  ? "Show less"
                  : `Show ${filterOptions.studyTypes.length - 4} more`}
              </Button>
            )}
          </div>
        </div>

        {/* Text Input Filters */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="sponsor-input" className="text-sm font-medium">
              Sponsor
            </Label>
            <Input
              id="sponsor-input"
              type="text"
              value={filters.sponsor || ""}
              onChange={(e) => handleFilterChange("sponsor", e.target.value)}
              placeholder="Search sponsor"
              className="h-8 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition-input" className="text-sm font-medium">
              Condition
            </Label>
            <Input
              id="condition-input"
              type="text"
              value={filters.condition || ""}
              onChange={(e) => handleFilterChange("condition", e.target.value)}
              placeholder="Search condition"
              className="h-8 text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intervention-input" className="text-sm font-medium">
              Intervention
            </Label>
            <Input
              id="intervention-input"
              type="text"
              value={filters.intervention || ""}
              onChange={(e) =>
                handleFilterChange("intervention", e.target.value)
              }
              placeholder="Search intervention"
              className="h-8 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
