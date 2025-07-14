"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchParams } from "@/types/clinical-trials";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { debounce } from "lodash";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  // Create a debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery: string) => {
        console.log("🔍 Debounced search:", searchQuery || "(empty)");
        onSearch({
          query: searchQuery,
          page: 1, // Reset to page 1 on new search
          limit: 20, // Ensure limit is set
        });
      }, 300), // 300ms delay
    [onSearch]
  );

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Trigger debounced search
    debouncedSearch(newQuery);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search clinical trials (e.g., NSCLC, immunotherapy, lung cancer)"
          className="h-12 pl-10 pr-4"
        />
      </div>
    </div>
  );
}
