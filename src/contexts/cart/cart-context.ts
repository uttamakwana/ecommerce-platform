import { createContext, use } from "react";
import type { TCartItem, IProduct } from "@/features/products/types";
import type { CartSummary } from "@/features/products/pricing";

export interface ICartContext {
  items: TCartItem[];
  /** Total number of units (sum of quantities), for the header badge. */
  totalItems: number;
  summary: CartSummary;
  getItem: (id: IProduct["id"]) => TCartItem | undefined;
  isInCart: (id: IProduct["id"]) => boolean;
  /** Adds a product, merging quantity if it already exists (stock-capped). */
  addItem: (product: IProduct, quantity?: number) => void;
  removeItem: (id: IProduct["id"]) => void;
  setQuantity: (id: IProduct["id"], quantity: number) => void;
  clear: () => void;
}

export const CartContext = createContext<ICartContext | null>(null);

export function useCart() {
  const context = use(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
