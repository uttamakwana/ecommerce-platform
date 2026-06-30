import type { IProduct, IProductCategory, IProductListingQueryArgs } from "@/features/products/types";
import { get } from "./http";

export const productsApi = {
    list: () => get<IProduct[]>("/products"),
    single: (id: IProduct["id"]) => get<IProduct>(`/products/${id}`),
    search: (query: string) => get<IProduct[]>("/products/search", { q: query }),
    filter: ({ limit, skip, sortBy, order }: IProductListingQueryArgs) => get<IProduct[]>("/products", { limit, skip, sortBy, order }),
};

export const categoriesApi = {
    list: () => get<IProductCategory[]>("/products/categories"),
    products: (categorySlug: IProductCategory["slug"]) => get<IProduct[]>(`/products/category/${categorySlug}`),
}