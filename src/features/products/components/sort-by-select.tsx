import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import type { IProduct } from "../types";
import { useFilters } from "@/hooks";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, FunnelX } from "lucide-react";
import { toReadableString } from "@/lib";

const SORT_BY_OPTIONS: Array<keyof IProduct> = [
  "title",
  "price",
  "rating",
  "discountPercentage",
  "stock",
];

export function SortBySelect() {
  const { sortBy, order, setFilters, clearFilters, hasActiveFilters } =
    useFilters();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={sortBy ?? ""}
        onValueChange={(value: keyof IProduct) => setFilters({ sortBy: value })}
      >
        <SelectTrigger className="w-40" aria-label="Sort products by">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {SORT_BY_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {toReadableString(option)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {sortBy && (
        <Button
          variant="outline"
          size="icon"
          aria-label={`Sort ${order === "desc" ? "descending" : "ascending"}`}
          onClick={() =>
            setFilters({ order: order === "asc" ? "desc" : "asc" })
          }
        >
          {order === "desc" ? <ArrowDownWideNarrow /> : <ArrowUpNarrowWide />}
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        aria-label="Clear all filters"
        disabled={!hasActiveFilters}
        onClick={clearFilters}
      >
        <FunnelX />
      </Button>
    </div>
  );
}
