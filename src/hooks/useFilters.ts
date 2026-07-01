import { useCallback } from "react";
import { useSearchParams } from "react-router";
import type {
  IProduct,
  IProductListingQueryArgs,
} from "@/features/products/types";

export type TFilterUpdate = Pick<
  IProductListingQueryArgs,
  "order" | "search" | "sortBy" | "category"
>;

/** Fields the UI is allowed to sort by (guards against arbitrary URL input). */
const SORTABLE_FIELDS: ReadonlySet<string> = new Set([
  "title",
  "price",
  "rating",
  "discountPercentage",
  "stock",
]);

/**
 * The URL query string is the single source of truth for browse filters, so
 * views stay shareable, bookmarkable, and survive back/forward navigation.
 */
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawSortBy = searchParams.get("sortBy") ?? undefined;
  const sortBy = (
    rawSortBy && SORTABLE_FIELDS.has(rawSortBy) ? rawSortBy : undefined
  ) as keyof IProduct | undefined;

  const rawOrder = searchParams.get("order");
  const order: "asc" | "desc" | undefined =
    rawOrder === "asc" || rawOrder === "desc" ? rawOrder : undefined;

  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const setFilters = useCallback(
    (updates: Partial<TFilterUpdate>) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(updates)) {
            if (value === undefined || value === null || value === "") {
              params.delete(key);
            } else {
              params.set(key, String(value));
            }
          }
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(
    () =>
      setFilters({
        sortBy: undefined,
        order: undefined,
        search: undefined,
        category: undefined,
      }),
    [setFilters],
  );

  const hasActiveFilters = Boolean(sortBy || order || search || category);

  return {
    searchParams,
    category,
    search,
    sortBy,
    order,
    setFilters,
    clearFilters,
    hasActiveFilters,
  };
}
