import type {
  IProduct,
  IProductCategory,
  IProductListingQueryArgs,
  IProductListingResponse,
} from "@/features/products/types";
import { get } from "@/api";

export const productsApi = {
  getProducts: ({
    limit,
    skip,
    sortBy,
    order,
  }: IProductListingQueryArgs = {}) =>
    get<IProductListingResponse>("/products", { limit, skip, sortBy, order }),
  getProduct: (id: IProduct["id"]) => get<IProduct>(`/products/${id}`),
  searchProducts: (query: string, {
    limit,
    skip,
    sortBy,
    order,
  }: IProductListingQueryArgs = {}) =>
    get<IProductListingResponse>("/products/search", { q: query, limit, skip, sortBy, order }),
  getCategories: () => get<IProductCategory[]>("/products/categories"),
  getProductsByCategory: (categorySlug: IProductCategory["slug"], {
    limit,
    skip,
    sortBy,
    order,
  }: IProductListingQueryArgs = {}) =>
    get<IProductListingResponse>(`/products/category/${categorySlug}`, { limit, skip, sortBy, order }),
};
