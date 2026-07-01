import type { TCartItem } from "./types";
import { getDiscountedPrice } from "./utils";

/**
 * Storefront pricing rules kept in one place so the cart page, summary, and
 * checkout all agree. Tweaking a rate here changes it everywhere.
 */
export const PRICING = {
  /** Orders at or above this (post-discount) subtotal ship for free. */
  FREE_SHIPPING_THRESHOLD: 100,
  /** Flat shipping fee applied below the free-shipping threshold. */
  SHIPPING_FLAT: 9.99,
  /** Sales tax applied to the discounted subtotal. */
  TAX_RATE: 0.08,
} as const;

export interface CartSummary {
  /** Sum of list prices × quantity (before discounts). */
  subtotal: number;
  /** Total saved via per-product discounts. */
  discount: number;
  /** Discounted subtotal (subtotal − discount). */
  itemsTotal: number;
  shipping: number;
  tax: number;
  total: number;
  /** Total number of units across all line items. */
  itemCount: number;
}

export function computeCartSummary(items: TCartItem[]): CartSummary {
  let subtotal = 0;
  let itemsTotal = 0;
  let itemCount = 0;

  for (const item of items) {
    subtotal += item.price * item.quantity;
    itemsTotal += getDiscountedPrice(item) * item.quantity;
    itemCount += item.quantity;
  }

  const discount = subtotal - itemsTotal;
  const shipping =
    itemsTotal === 0 || itemsTotal >= PRICING.FREE_SHIPPING_THRESHOLD
      ? 0
      : PRICING.SHIPPING_FLAT;
  const tax = itemsTotal * PRICING.TAX_RATE;
  const total = itemsTotal + shipping + tax;

  return { subtotal, discount, itemsTotal, shipping, tax, total, itemCount };
}
