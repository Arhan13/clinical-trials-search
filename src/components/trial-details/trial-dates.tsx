// Server component - no client-side logic needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { StatusModule } from "@/types/clinical-trials";
import { formatDate, formatDateString } from "@/lib/date-utils";

interface TrialDatesProps {
  status: StatusModule;
}

export function TrialDates({ status }: TrialDatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Study Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Start Date</h4>
            <p className="text-sm text-muted-foreground">
              {formatDate(status.startDateStruct)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Primary Completion Date</h4>
            <p className="text-sm text-muted-foreground">
              {formatDate(status.primaryCompletionDateStruct)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Study Completion Date</h4>
            <p className="text-sm text-muted-foreground">
              {formatDate(status.completionDateStruct)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">First Submitted</h4>
            <p className="text-sm text-muted-foreground">
              {formatDateString(status.studyFirstSubmitDate)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Last Updated</h4>
            <p className="text-sm text-muted-foreground">
              {formatDateString(status.lastUpdateSubmitDate)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Status Verified</h4>
            <p className="text-sm text-muted-foreground">
              {formatDateString(status.statusVerifiedDate)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
