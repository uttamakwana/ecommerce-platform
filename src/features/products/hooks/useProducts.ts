import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PRODUCT_QUERY_KEYS, productsApi } from "../api";
import type { IProductListingQueryArgs } from "../types";

export function useCategories() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.CATEGORIES,
    queryFn: () => productsApi.getCategories(),
    staleTime: 10 * 60_000,
  });
}

export function useGetProduct(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.PRODUCT(id),
    queryFn: () => productsApi.getProduct(id),
    staleTime: 10 * 60_000,
    enabled: options?.enabled ?? true,
  });
}

export function useProducts(params: IProductListingQueryArgs = {}) {
  return useInfiniteQuery({
    queryKey: PRODUCT_QUERY_KEYS.PRODUCTS(params),
    queryFn: ({ pageParam }) => {
      const actualParams = { ...params, skip: pageParam };

      if (params.search) {
        return productsApi.searchProducts(params.search, actualParams);
      }

      if (params.category) {
        return productsApi.getProductsByCategory(params.category, actualParams);
      }

      return productsApi.getProducts(actualParams);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;

      return nextSkip >= lastPage.total ? undefined : nextSkip;
    },
    staleTime: 60_000,
  });
}
