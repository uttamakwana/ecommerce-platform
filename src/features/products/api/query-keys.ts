import type { IProduct } from "../types";

export const PRODUCT_QUERY_KEYS = {
  CATEGORIES: ["categories"],
  PRODUCTS: (filters = {}) => ["products", filters],
  PRODUCT: (id: IProduct["id"]) => ["product", id]
};
