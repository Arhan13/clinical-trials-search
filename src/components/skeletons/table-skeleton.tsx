import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 7 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: columns }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              {cellIndex === 0 ? (
                // NCT ID column - shorter width
                <Skeleton className="h-4 w-24" />
              ) : cellIndex === 1 ? (
                // Title column - longer width
                <Skeleton className="h-4 w-64" />
              ) : cellIndex === 2 ? (
                // Status column - medium width
                <Skeleton className="h-6 w-32 rounded-full" />
              ) : cellIndex === 3 ? (
                // Phase column - small width
                <Skeleton className="h-4 w-16" />
              ) : cellIndex === 4 ? (
                // Study Type column - medium width
                <Skeleton className="h-4 w-28" />
              ) : cellIndex === 5 ? (
                // Sponsor column - long width
                <Skeleton className="h-4 w-48" />
              ) : (
                // Other columns - default width
                <Skeleton className="h-4 w-20" />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
