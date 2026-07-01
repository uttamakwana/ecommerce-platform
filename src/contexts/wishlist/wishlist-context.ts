import { createContext, use } from "react";
import type { IProduct } from "@/features/products/types";

export interface IWishlistContext {
  items: IProduct[];
  count: number;
  has: (id: IProduct["id"]) => boolean;
  /** Adds or removes the product; returns the new membership state. */
  toggle: (product: IProduct) => void;
  remove: (id: IProduct["id"]) => void;
  clear: () => void;
}

export const WishlistContext = createContext<IWishlistContext | null>(null);

export function useWishlist() {
  const context = use(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
