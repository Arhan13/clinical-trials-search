"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye } from "lucide-react";
import { ClinicalTrial } from "@/types/clinical-trials";
import { formatPhases } from "@/lib/format-utils";
import { formatDateStringForTable } from "@/lib/date-utils";
import { StatusBadge } from "@/components/common/status-badge";
import { SortableHeader } from "@/components/common/sortable-header";
import { TrialDetailsSheet } from "./trial-details-sheet";

export const createColumns = (
  onSortingChange?: (sortBy: string, sortOrder: "asc" | "desc") => void,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
): ColumnDef<ClinicalTrial>[] => [
  {
    accessorKey: "protocolSection.identificationModule.nctId",
    id: "nctId",
    header: () => (
      <SortableHeader
        columnKey="nct-id"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        NCT ID
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const nctId = row.getValue("nctId") as string;
      return (
        <Button
          variant="link"
          asChild
          className="h-auto p-0 font-medium text-primary"
        >
          <a
            href={`https://clinicaltrials.gov/study/${nctId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            {nctId}
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "protocolSection.identificationModule.briefTitle",
    id: "title",
    header: () => (
      <SortableHeader
        columnKey="title"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        Title
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <div className="max-w-md">
          <div className="truncate" title={title}>
            {title}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "protocolSection.statusModule.overallStatus",
    id: "status",
    header: () => (
      <SortableHeader
        columnKey="status"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        Status
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBadge status={status} />;
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "protocolSection.designModule.phases",
    id: "phase",
    header: () => (
      <SortableHeader
        columnKey="phase"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        Phase
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const phases = row.getValue("phase") as string[] | undefined;
      return formatPhases(phases);
    },
    enableSorting: true,
  },
  {
    accessorKey: "protocolSection.designModule.studyType",
    id: "studyType",
    header: () => (
      <SortableHeader
        columnKey="studyType"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        Study Type
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const studyType = row.getValue("studyType") as string;
      return (
        <Badge variant="outline" className="text-xs">
          {studyType}
        </Badge>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "protocolSection.conditionsModule.conditions",
    id: "conditions",
    header: "Conditions",
    cell: ({ row }) => {
      const conditions = row.getValue("conditions") as string[] | undefined;
      if (!conditions || conditions.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <div className="max-w-xs">
          <div className="truncate" title={conditions.join(", ")}>
            {conditions.slice(0, 2).join(", ")}
            {conditions.length > 2 && ` (+${conditions.length - 2} more)`}
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "protocolSection.armsInterventionsModule.interventions",
    id: "interventions",
    header: "Interventions",
    cell: ({ row }) => {
      const interventions = row.getValue("interventions") as
        | Array<{ name: string }>
        | undefined;
      if (!interventions || interventions.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }
      const interventionNames = interventions.map((i) => i.name);
      return (
        <div className="max-w-xs">
          <div className="truncate" title={interventionNames.join(", ")}>
            {interventionNames.slice(0, 2).join(", ")}
            {interventionNames.length > 2 &&
              ` (+${interventionNames.length - 2} more)`}
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "protocolSection.designModule.enrollmentInfo.count",
    id: "enrollment",
    header: () => (
      <SortableHeader
        columnKey="enrollment"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        Enrollment
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const trial = row.original;
      const enrollment =
        trial.protocolSection.designModule?.enrollmentInfo?.count;
      return enrollment ? (
        enrollment.toLocaleString()
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "protocolSection.statusModule.startDateStruct.date",
    id: "startDate",
    header: () => (
      <SortableHeader
        columnKey="startDate"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        Start Date
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const trial = row.original;
      const startDate =
        trial.protocolSection.statusModule.startDateStruct?.date;
      return formatDateStringForTable(startDate);
    },
    enableSorting: true,
  },
  {
    accessorKey: "protocolSection.eligibilityModule",
    id: "ageRange",
    header: "Age Range",
    cell: ({ row }) => {
      const trial = row.original;
      const eligibility = trial.protocolSection.eligibilityModule;
      if (!eligibility) {
        return <span className="text-muted-foreground">-</span>;
      }

      const minAge = eligibility.minimumAge || "N/A";
      const maxAge = eligibility.maximumAge || "N/A";

      if (minAge === "N/A" && maxAge === "N/A") {
        return <span className="text-muted-foreground">-</span>;
      }

      return `${minAge} - ${maxAge}`;
    },
    enableSorting: false,
  },
  {
    accessorKey: "protocolSection.sponsorCollaboratorsModule.leadSponsor.name",
    id: "sponsor",
    header: () => (
      <SortableHeader
        columnKey="sponsor"
        onSortingChange={onSortingChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
      >
        Sponsor
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const sponsor = row.getValue("sponsor") as string;
      return (
        <div className="max-w-xs">
          <div className="truncate" title={sponsor}>
            {sponsor}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const trial = row.original;

      return (
        <TrialDetailsSheet
          trial={trial}
          trigger={
            <Button variant="ghost" size="sm" className="h-auto p-1">
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Button>
          }
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
