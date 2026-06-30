import { CategoryPills } from "@/components";
import { useProductFilter } from "@/contexts/product/useProductFilters";
import { ProductCard, ProductCardSkeleton, SortBySelect } from "@/features/products/components";
import { useProducts } from "@/features/products/hooks";
import type { IProductListingQueryArgs, IProductListingResponse } from "@/features/products/types";
import { useObserver } from "@/hooks";

export function ProductListing() {
  const { searchParams } = useProductFilter();
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const sortBy =
    (searchParams.get("sortBy") as IProductListingQueryArgs["sortBy"]) ??
    undefined;
  const order =
    (searchParams.get("order") as IProductListingQueryArgs["order"]) ??
    undefined;
  const skip = Number(searchParams.get("skip") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "20");

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useProducts({
    category,
    search,
    sortBy,
    order,
    skip,
    limit,
  });
  const products = data?.pages?.flatMap((page) => page?.products) ?? [];
  const { lastItemRef } = useObserver<IProductListingResponse>({ isFetchingNextPage, hasNextPage, fetchNextPage: fetchNextPage });


  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <CategoryPills />

      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold">Products</h2>
        <SortBySelect />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
        {isLoading && Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}

        {products.map((product, index) => {
          if (index === products.length - 1) {
            return (
              <div ref={lastItemRef} key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          }

          return (
            <ProductCard
              key={product.id}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}
