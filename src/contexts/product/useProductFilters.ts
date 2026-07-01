import type { IProductCategory, TCartItem } from "@/features/products/types";
import { createContext, use } from "react";
import type { THandleSearchParamChangeKey } from "./type";

export type TCategoryContextValue = IProductCategory["slug"] | undefined;
type IProductContext = {
  getCartItem: (productId: TCartItem["id"]) => TCartItem | undefined;
  cartItems: TCartItem[];
  handleAddToCart: (item: TCartItem) => void;
  handleRemoveFromCart: (itemId: TCartItem["id"]) => void;
  handleChangeQuantity: (itemId: TCartItem["id"], newQuantity: number) => void;
  searchParams: URLSearchParams;
  handleChangeSearchParams: (
    updates: Partial<THandleSearchParamChangeKey>,
  ) => void;
  emptyCart: () => void;
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
