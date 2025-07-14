// Server component - no client-side logic needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope } from "lucide-react";
import { ConditionsModule } from "@/types/clinical-trials";

interface TrialConditionsProps {
  conditions: ConditionsModule | undefined;
}

export function TrialConditions({ conditions }: TrialConditionsProps) {
  if (!conditions) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {conditions.conditions && conditions.conditions.length > 0 ? (
          <div className="space-y-2">
            {conditions.conditions.map((condition, index) => (
              <Badge key={index} variant="outline" className="mr-2 mb-2">
                {condition}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Stethoscope className="h-4 w-4" />
            <span>No conditions specified</span>
          </div>
        )}

        {conditions.keywords && conditions.keywords.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Keywords</h4>
            <div className="space-y-1">
              {conditions.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="mr-2 mb-2">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
