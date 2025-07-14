"use client";

import { useState } from "react";
import {
  SearchResult,
  SearchParams,
  ClinicalTrial,
} from "@/types/clinical-trials";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { formatPhases } from "@/lib/format-utils";
import { formatDateShort } from "@/lib/date-utils";
import { StatusBadge } from "@/components/common/status-badge";

interface ResultsTableProps {
  results: SearchResult;
  onSearch: (params: SearchParams) => void;
}

export default function ResultsTable({ results, onSearch }: ResultsTableProps) {
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (column: string) => {
    const newSortOrder =
      sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);

    onSearch({
      query: "",
      page: 1,
      sortBy: column,
      sortOrder: newSortOrder,
    });
  };

  const handlePageChange = (page: number) => {
    onSearch({
      query: "",
      page,
      sortBy,
      sortOrder,
    });
  };

  const toggleRowExpansion = (nctId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(nctId)) {
      newExpandedRows.delete(nctId);
    } else {
      newExpandedRows.add(nctId);
    }
    setExpandedRows(newExpandedRows);
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) {
      return <ChevronUp className="h-4 w-4 text-muted-foreground" />;
    }

    return sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4 text-primary" />
    ) : (
      <ChevronDown className="h-4 w-4 text-primary" />
    );
  };

  const renderExpandedRow = (trial: ClinicalTrial) => (
    <TableRow
      key={`${trial.protocolSection.identificationModule.nctId}-expanded`}
    >
      <TableCell colSpan={6} className="bg-muted/50 p-6">
        <div className="space-y-6">
          {/* Study Description */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Study Description</h4>
            <p className="text-sm text-muted-foreground">
              {trial.protocolSection.descriptionModule?.briefSummary ||
                "No description available"}
            </p>
          </div>

          <Separator />

          {/* Conditions */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Conditions</h4>
            <div className="flex flex-wrap gap-2">
              {trial.protocolSection.conditionsModule?.conditions?.map(
                (condition, index) => (
                  <Badge key={index} variant="secondary">
                    {condition}
                  </Badge>
                )
              ) || (
                <span className="text-sm text-muted-foreground">
                  No conditions specified
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Interventions */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Interventions</h4>
            <div className="space-y-3">
              {trial.protocolSection.armsInterventionsModule?.interventions?.map(
                (intervention, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4">
                    <div className="font-medium text-sm">
                      {intervention.name}
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {intervention.type}
                    </Badge>
                    {intervention.description && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {intervention.description}
                      </p>
                    )}
                  </div>
                )
              ) || (
                <span className="text-sm text-muted-foreground">
                  No interventions specified
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* Enrollment and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-2">Enrollment</h4>
              <div className="text-sm text-muted-foreground">
                {trial.protocolSection.designModule?.enrollmentInfo?.count
                  ? `${trial.protocolSection.designModule.enrollmentInfo.count} participants (${trial.protocolSection.designModule.enrollmentInfo.type})`
                  : "No enrollment information available"}
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-sm">Start Date</h4>
                <div className="text-sm text-muted-foreground">
                  {formatDateShort(
                    trial.protocolSection.statusModule.startDateStruct
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Primary Completion</h4>
                <div className="text-sm text-muted-foreground">
                  {formatDateShort(
                    trial.protocolSection.statusModule
                      .primaryCompletionDateStruct
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Study Completion</h4>
                <div className="text-sm text-muted-foreground">
                  {formatDateShort(
                    trial.protocolSection.statusModule.completionDateStruct
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Clinical Trials Results</span>
          <div className="text-sm text-muted-foreground font-normal">
            Showing {(results.page - 1) * results.limit + 1}-
            {Math.min(results.page * results.limit, results.totalCount)} of{" "}
            {results.totalCount} results
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("nct-id")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    NCT ID
                    <SortIcon column="nct-id" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("title")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Title
                    <SortIcon column="title" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Status
                    <SortIcon column="status" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("phase")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Phase
                    <SortIcon column="phase" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("sponsor")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Sponsor
                    <SortIcon column="sponsor" />
                  </Button>
                </TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.trials
                .map((trial) => {
                  const isExpanded = expandedRows.has(
                    trial.protocolSection.identificationModule.nctId
                  );
                  return [
                    <TableRow
                      key={trial.protocolSection.identificationModule.nctId}
                    >
                      <TableCell className="font-medium">
                        <Button
                          variant="link"
                          asChild
                          className="h-auto p-0 font-medium text-primary"
                        >
                          <a
                            href={`https://clinicaltrials.gov/study/${trial.protocolSection.identificationModule.nctId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            {trial.protocolSection.identificationModule.nctId}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="truncate">
                          {
                            trial.protocolSection.identificationModule
                              .briefTitle
                          }
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            trial.protocolSection.statusModule.overallStatus
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {formatPhases(
                          trial.protocolSection.designModule?.phases
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate">
                          {
                            trial.protocolSection.sponsorCollaboratorsModule
                              .leadSponsor.name
                          }
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toggleRowExpansion(
                              trial.protocolSection.identificationModule.nctId
                            )
                          }
                          className="h-auto p-1"
                        >
                          {isExpanded ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Hide
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Show
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>,
                    ...(isExpanded ? [renderExpandedRow(trial)] : []),
                  ];
                })
                .flat()}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Page {results.page} of {results.totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(results.page - 1)}
              disabled={results.page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, results.totalPages) }, (_, i) => {
              const page =
                Math.max(
                  1,
                  Math.min(results.totalPages - 4, results.page - 2)
                ) + i;
              return (
                <Button
                  key={page}
                  variant={page === results.page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(results.page + 1)}
              disabled={results.page === results.totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
