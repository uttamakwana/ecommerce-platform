import type { IProductCategory } from "@/features/products/types";
import { createContext, use } from "react";
import type { THandleSearchParamChangeKey } from "./type";

export type TCategoryContextValue = IProductCategory["slug"] | undefined;
type IProductContext = {
  searchParams: URLSearchParams;
  handleChangeSearchParams: (
    updates: Partial<THandleSearchParamChangeKey>,
  ) => void;
};
export const ProductContext = createContext<IProductContext | null>(null);

export function useProductFilter() {
  const context = use(ProductContext);

  if (!context) {
    throw new Error(
      "useProductFilter must be used within ProductContextProvider!",
    );
  }

  return context;
}
