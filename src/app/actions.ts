import { searchClinicalTrials, getFilterOptions } from "@/lib/data-loader";
import { SearchParams } from "@/types/clinical-trials";
import { redirect } from "next/navigation";

/**
 * Server action for clinical trials search
 * Leverages Next.js 15 server actions for optimal SSR performance
 */
export async function searchTrialsAction(formData: FormData) {
  const query = formData.get("query") as string;
  const page = formData.get("page") as string;
  const limit = formData.get("limit") as string;
  const sortBy = formData.get("sortBy") as string;
  const sortOrder = formData.get("sortOrder") as "asc" | "desc";

  // Build search parameters
  const searchParams = new URLSearchParams();

  if (query) searchParams.set("query", query);
  if (page && page !== "1") searchParams.set("page", page);
  if (limit && limit !== "20") searchParams.set("limit", limit);
  if (sortBy) searchParams.set("sortBy", sortBy);
  if (sortOrder) searchParams.set("sortOrder", sortOrder);

  // Add filter parameters
  const filters = [
    "phase",
    "status",
    "studyType",
    "sponsor",
    "condition",
    "intervention",
  ];

  filters.forEach((filter) => {
    const value = formData.get(filter) as string;
    if (value) {
      searchParams.set(filter, value);
    }
  });

  // Redirect to the same page with search parameters
  // This will trigger SSR with the new parameters
  redirect(`/?${searchParams.toString()}`);
}

/**
 * Server action to get filter options
 * Returns filter options for server-side rendering
 */
export async function getFilterOptionsAction() {
  return await getFilterOptions();
}

/**
 * Server action to perform search
 * Returns search results for server-side rendering
 */
export async function performSearchAction(searchParams: SearchParams) {
  return await searchClinicalTrials(searchParams);
}
