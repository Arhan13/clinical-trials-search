// Server component - no client-side logic needed
import { Badge } from "@/components/ui/badge";
import { formatStatus } from "@/lib/format-utils";

export type StatusVariant = "default" | "secondary" | "outline" | "destructive";

/**
 * Get the appropriate badge variant for a given status
 */
export function getStatusVariant(status: string): StatusVariant {
  switch (status) {
    case "RECRUITING":
      return "default";
    case "ACTIVE_NOT_RECRUITING":
      return "secondary";
    case "COMPLETED":
      return "outline";
    case "TERMINATED":
      return "destructive";
    default:
      return "secondary";
  }
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

/**
 * Common status badge component with consistent styling
 * Server component for optimal SSR performance
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={getStatusVariant(status)} className={className}>
      {formatStatus(status)}
    </Badge>
  );
}
