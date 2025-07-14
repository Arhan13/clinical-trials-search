// Server component - no client-side logic needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";
import { SponsorCollaboratorsModule } from "@/types/clinical-trials";

interface TrialSponsorProps {
  sponsor: SponsorCollaboratorsModule;
}

export function TrialSponsor({ sponsor }: TrialSponsorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Sponsor Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Lead Sponsor</h4>
            <div className="flex items-center gap-2">
              <Badge variant="default">{sponsor.leadSponsor.name}</Badge>
              <Badge variant="outline">{sponsor.leadSponsor.class}</Badge>
            </div>
          </div>

          {sponsor.collaborators && sponsor.collaborators.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Collaborators</h4>
              <div className="space-y-2">
                {sponsor.collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="secondary">{collaborator.name}</Badge>
                    <Badge variant="outline">{collaborator.class}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sponsor.responsibleParty && (
            <div>
              <h4 className="font-semibold mb-2">Responsible Party</h4>
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Type:</span>{" "}
                  {sponsor.responsibleParty.type}
                </div>
                {sponsor.responsibleParty.investigatorFullName && (
                  <div className="text-sm">
                    <span className="font-medium">Investigator:</span>{" "}
                    {sponsor.responsibleParty.investigatorFullName}
                  </div>
                )}
                {sponsor.responsibleParty.investigatorTitle && (
                  <div className="text-sm">
                    <span className="font-medium">Title:</span>{" "}
                    {sponsor.responsibleParty.investigatorTitle}
                  </div>
                )}
                {sponsor.responsibleParty.investigatorAffiliation && (
                  <div className="text-sm">
                    <span className="font-medium">Affiliation:</span>{" "}
                    {sponsor.responsibleParty.investigatorAffiliation}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
