// Server component - no client-side logic needed
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ClinicalTrial } from "@/types/clinical-trials";
import { StatusBadge } from "@/components/common/status-badge";

interface TrialHeaderProps {
  trial: ClinicalTrial;
}

export function TrialHeader({ trial }: TrialHeaderProps) {
  const identification = trial.protocolSection.identificationModule;
  const status = trial.protocolSection.statusModule;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <div className="text-base text-muted-foreground">
            <div className="flex items-center gap-3 flex-wrap">
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
              <span className="text-muted-foreground">•</span>
              <span>{identification.organization.fullName}</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={status.overallStatus} />
        </div>
      </div>

      {identification.officialTitle && (
        <div className="pt-2 border-t">
          <h3 className="text-lg font-semibold mb-2">Official Title</h3>
          <p className="text-muted-foreground">
            {identification.officialTitle}
          </p>
        </div>
      )}
    </div>
  );
}
