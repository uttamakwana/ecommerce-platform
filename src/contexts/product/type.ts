import type { IProductListingQueryArgs } from "@/features/products/types";

export type THandleSearchParamChangeKey = Pick<
  IProductListingQueryArgs,
  "limit" | "order" | "search" | "skip" | "sortBy" | "category"
>;
