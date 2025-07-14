"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface SortableHeaderProps {
  columnKey: string;
  children: React.ReactNode;
  onSortingChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  className?: string;
}

/**
 * Common sortable header component with consistent sorting UI
 */
export function SortableHeader({
  columnKey,
  children,
  onSortingChange,
  sortBy,
  sortOrder,
  className = "h-auto p-0 font-semibold hover:bg-transparent",
}: SortableHeaderProps) {
  const isSorted = sortBy === columnKey;
  const isAsc = isSorted && sortOrder === "asc";
  const isDesc = isSorted && sortOrder === "desc";

  const handleClick = () => {
    if (onSortingChange) {
      const newSortOrder = isAsc ? "desc" : "asc";
      onSortingChange(columnKey, newSortOrder);
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick} className={className}>
      {children}
      {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
      {isAsc && <ArrowUp className="ml-2 h-4 w-4" />}
      {isDesc && <ArrowDown className="ml-2 h-4 w-4" />}
    </Button>
  );
}
