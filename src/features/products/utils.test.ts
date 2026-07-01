import { describe, expect, it } from "vitest";
import { getDiscountedPrice } from "./utils";
import type { IProduct } from "./types";

const product = (price: number, discountPercentage: number) =>
  ({ price, discountPercentage }) as IProduct;

describe("getDiscountedPrice", () => {
  it("returns the list price when there is no discount", () => {
    expect(getDiscountedPrice(product(100, 0))).toBe(100);
  });

  it("subtracts the discount percentage", () => {
    expect(getDiscountedPrice(product(100, 25))).toBe(75);
  });

  it("handles fractional discounts", () => {
    expect(getDiscountedPrice(product(49.99, 10))).toBeCloseTo(44.991);
  });
});
