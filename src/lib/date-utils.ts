/**
 * Common date formatting utilities to ensure consistent date display
 * across all components and avoid hydration mismatches.
 */

export interface DateStruct {
  date: string;
  type: string;
}

/**
 * Format a date struct to a localized string
 */
export function formatDate(
  dateStruct: DateStruct | undefined,
  fallback: string = "Not specified"
): string {
  if (!dateStruct) return fallback;

  return new Date(dateStruct.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date struct to a short localized string
 */
export function formatDateShort(
  dateStruct: DateStruct | undefined,
  fallback: string = "N/A"
): string {
  if (!dateStruct) return fallback;

  return new Date(dateStruct.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a date string to a localized string
 */
export function formatDateString(
  dateString: string | undefined,
  fallback: string = "Not available"
): string {
  if (!dateString) return fallback;

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a date string to a short localized string (for table cells)
 */
export function formatDateStringForTable(
  dateString: string | undefined
): string {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
