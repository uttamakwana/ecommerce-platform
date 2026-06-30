export const PRODUCT_QUERY_KEYS = {
  CATEGORIES: ["categories"],
  PRODUCTS: (filters = {}) => ["products", filters],
  PRODUCT: (id: string) => ["product", id]
};
