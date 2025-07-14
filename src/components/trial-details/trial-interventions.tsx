// Server component - no client-side logic needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beaker } from "lucide-react";
import { ArmsInterventionsModule } from "@/types/clinical-trials";

interface TrialInterventionsProps {
  interventions: ArmsInterventionsModule | undefined;
}

export function TrialInterventions({ interventions }: TrialInterventionsProps) {
  if (!interventions) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="h-5 w-5" />
          Interventions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {interventions.interventions &&
        interventions.interventions.length > 0 ? (
          <div className="space-y-3">
            {interventions.interventions.map((intervention, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{intervention.type}</Badge>
                  <span className="font-medium">{intervention.name}</span>
                </div>
                {intervention.description && (
                  <p className="text-sm text-muted-foreground">
                    {intervention.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Beaker className="h-4 w-4" />
            <span>No interventions specified</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
