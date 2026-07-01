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
import { useProductFilter } from "@/contexts/product/useProductFilters";
import { FunnelX, ListSortAscending, ListSortDescending } from "lucide-react";
import { toReadableString } from "@/lib";

const SORT_BY_OPTIONS: Array<keyof IProduct> = [
  "title",
  "price",
  "rating",
  "discountPercentage",
  "stock",
];

export function SortBySelect() {
  const { handleChangeSearchParams, searchParams } = useProductFilter();
  const order = searchParams.get("order");
  const sortBy = searchParams.get("sortBy");
  const search = searchParams.get("search");

  const hasSortBy = Boolean(sortBy);
  const hasFilters = hasSortBy || Boolean(order) || Boolean(search);

  return (
    <div className="flex items-center gap-2">
      <Select
        value={sortBy ?? ""}
        onValueChange={(value: keyof IProduct) => {
          handleChangeSearchParams({
            sortBy: value,
          });
        }}
      >
        <SelectTrigger className="w-max">
          <SelectValue placeholder="sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            {/* <SelectItem value="All">All</SelectItem> */}
            {SORT_BY_OPTIONS?.map((sortByOption) => (
              <SelectItem key={sortByOption} value={sortByOption}>
                {toReadableString(sortByOption)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {hasSortBy && (
        <Button
          onClick={() => {
            handleChangeSearchParams({
              order: !order ? "desc" : order === "asc" ? "desc" : "asc",
            });
          }}
        >
          {!order || order === "asc" ? (
            <ListSortAscending />
          ) : (
            <ListSortDescending />
          )}
        </Button>
      )}

      <Button
        disabled={!hasFilters}
        onClick={() => {
          handleChangeSearchParams({ sortBy: undefined, order: undefined });
        }}
      >
        <FunnelX />
      </Button>
    </div>
  );
}
