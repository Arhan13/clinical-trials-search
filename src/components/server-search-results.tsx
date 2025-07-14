import { searchClinicalTrials } from "@/lib/data-loader";
import { SearchParams, SearchResult } from "@/types/clinical-trials";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/status-badge";
import { formatPhases } from "@/lib/format-utils";
import { formatDateStringForTable } from "@/lib/date-utils";
import { ExternalLink, Users, Building, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServerSearchResultsProps {
  searchParams: SearchParams;
}

/**
 * Server component that renders search results with full SSR
 * for optimal performance and SEO
 */
export async function ServerSearchResults({
  searchParams,
}: ServerSearchResultsProps) {
  const results: SearchResult = await searchClinicalTrials(searchParams);

  if (results.trials.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Results Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No clinical trials match your search criteria. Try adjusting your
            filters or search terms.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <p className="text-muted-foreground">
          {results.totalCount} trials found (page {results.page} of{" "}
          {results.totalPages})
        </p>
      </div>

      <div className="space-y-4">
        {results.trials.map((trial) => {
          const identification = trial.protocolSection.identificationModule;
          const status = trial.protocolSection.statusModule;
          const design = trial.protocolSection.designModule;
          const sponsor = trial.protocolSection.sponsorCollaboratorsModule;
          const conditions = trial.protocolSection.conditionsModule;

          return (
            <Card
              key={identification.nctId}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {identification.briefTitle}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Button
                        variant="link"
                        asChild
                        className="h-auto p-0 text-primary"
                      >
                        <a
                          href={`https://clinicaltrials.gov/study/${identification.nctId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          {identification.nctId}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {sponsor.leadSponsor.name}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={status.overallStatus} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Phase</h4>
                    <Badge variant="outline" className="text-xs">
                      {formatPhases(design?.phases)}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Study Type</h4>
                    <Badge variant="outline" className="text-xs">
                      {design?.studyType}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Enrollment</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-3 w-3" />
                      {design?.enrollmentInfo?.count?.toLocaleString() || "N/A"}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Start Date</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3" />
                      {formatDateStringForTable(status.startDateStruct?.date)}
                    </div>
                  </div>
                </div>

                {conditions?.conditions && conditions.conditions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-2">Conditions</h4>
                    <div className="flex flex-wrap gap-1">
                      {conditions.conditions
                        .slice(0, 3)
                        .map((condition, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {condition}
                          </Badge>
                        ))}
                      {conditions.conditions.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{conditions.conditions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
