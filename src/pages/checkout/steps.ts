export const CHECKOUT_STEPS = ["shipping", "payment", "review"] as const;
export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

export const STEP_LABELS: Record<CheckoutStep, string> = {
  shipping: "Shipping",
  payment: "Payment",
  review: "Review",
};
