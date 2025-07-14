import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "./table-skeleton";

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Table Header Skeleton */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-12" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-14" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-12" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-18" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableSkeleton rows={8} columns={7} />
            </TableBody>
          </Table>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center space-x-1">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
