import { PageHeader } from "@/components/page-header";
import { ServerSearchHandler } from "@/components/server-search-handler";

interface HomePageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    phase?: string;
    status?: string;
    studyType?: string;
    sponsor?: string;
    condition?: string;
    intervention?: string;
  }>;
}

/**
 * Server component that handles SSR with URL-based search parameters
 * for optimal performance and SEO
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />
        <ServerSearchHandler searchParams={resolvedSearchParams} />
      </div>
    </div>
  );
}
