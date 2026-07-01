import { describe, expect, it } from "vitest";
import { computeCartSummary, PRICING } from "./pricing";
import type { TCartItem } from "./types";

/** Minimal cart item factory — only the fields pricing reads. */
function item(overrides: Partial<TCartItem>): TCartItem {
  return {
    id: 1,
    price: 100,
    discountPercentage: 0,
    stock: 100,
    quantity: 1,
    title: "Test",
    ...overrides,
  } as TCartItem;
}

describe("computeCartSummary", () => {
  it("returns zeroed totals for an empty cart", () => {
    const s = computeCartSummary([]);
    expect(s).toMatchObject({
      subtotal: 0,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      itemCount: 0,
    });
  });

  it("multiplies price by quantity and counts units", () => {
    const s = computeCartSummary([
      item({ price: 20, quantity: 3, discountPercentage: 0 }),
    ]);
    expect(s.subtotal).toBe(60);
    expect(s.itemCount).toBe(3);
  });

  it("applies per-item discounts to the discounted subtotal", () => {
    const s = computeCartSummary([
      item({ price: 50, discountPercentage: 10, quantity: 2 }),
    ]);
    // 50 * 2 = 100 subtotal, 10% off = 10 discount, itemsTotal 90
    expect(s.subtotal).toBe(100);
    expect(s.discount).toBeCloseTo(10);
    expect(s.itemsTotal).toBeCloseTo(90);
  });

  it("charges flat shipping below the free-shipping threshold", () => {
    const s = computeCartSummary([
      item({ price: 20, quantity: 1, discountPercentage: 0 }),
    ]);
    expect(s.shipping).toBe(PRICING.SHIPPING_FLAT);
  });

  it("gives free shipping at or above the threshold", () => {
    const s = computeCartSummary([
      item({ price: PRICING.FREE_SHIPPING_THRESHOLD, quantity: 1 }),
    ]);
    expect(s.shipping).toBe(0);
  });

  it("computes tax and a total that includes shipping and tax", () => {
    const s = computeCartSummary([
      item({ price: 20, quantity: 1, discountPercentage: 0 }),
    ]);
    expect(s.tax).toBeCloseTo(20 * PRICING.TAX_RATE);
    expect(s.total).toBeCloseTo(20 + PRICING.SHIPPING_FLAT + 20 * PRICING.TAX_RATE);
  });
});
