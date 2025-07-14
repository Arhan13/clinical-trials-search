import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FilterSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Filter Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>

        {/* Phase Filter Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Study Type Filter Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Filter Sections */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
