import { createContext, use } from "react";
import type { IProduct } from "@/features/products/types";

/** Maximum number of products that can be compared side-by-side. */
export const MAX_COMPARE = 4;

export interface ICompareContext {
  items: IProduct[];
  count: number;
  has: (id: IProduct["id"]) => boolean;
  /** True when there is room for another product (below MAX_COMPARE). */
  canAdd: boolean;
  toggle: (product: IProduct) => void;
  remove: (id: IProduct["id"]) => void;
  clear: () => void;
}

export const CompareContext = createContext<ICompareContext | null>(null);

export function useCompare() {
  const context = use(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
