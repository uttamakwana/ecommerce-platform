import type { IProduct } from "./types";

export const getDiscountedPrice = (product: IProduct) =>
    product.price -
    (product.price * product.discountPercentage) / 100;