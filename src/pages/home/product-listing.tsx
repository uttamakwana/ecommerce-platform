import { CategoryPills } from "@/components";
import { ErrorState } from "@/components/error-state";
import {
  ProductCardSkeleton,
  SortBySelect,
} from "@/features/products/components";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { VirtualizedProductGrid } from "@/features/products/components/virtualized-product-grid";
import { useProducts } from "@/features/products/hooks";
import { useFilters } from "@/hooks";
import { toReadableString } from "@/lib";

const PAGE_SIZE = 24;

export function ProductListing() {
  const { category, search, sortBy, order } = useFilters();

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProducts({ category, search, sortBy, order, limit: PAGE_SIZE });

  const products = data?.pages.flatMap((page) => page.products) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const heading = search
    ? `Results for "${search}"`
    : category
      ? toReadableString(category)
      : "All products";

  return (
    <div className="flex flex-col gap-5">
      <CategoryPills />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{heading}</h2>
          {!isLoading && !isError && (
            <p className="text-sm text-muted-foreground">
              {total.toLocaleString()} product{total === 1 ? "" : "s"}
            </p>
          )}
        </div>
        <SortBySelect />
      </div>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <ProductNotFound
          title="No products found"
          description="Try a different search term or clear your filters to see everything."
        />
      ) : (
        <VirtualizedProductGrid
          products={products}
          hasNextPage={Boolean(hasNextPage)}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
}
