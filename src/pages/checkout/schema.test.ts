import { describe, expect, it } from "vitest";
import { paymentSchema, shippingSchema } from "./schema";

const validShipping = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  phone: "+1 555 123 4567",
  address: "123 Market St",
  city: "Springfield",
  state: "CA",
  zip: "90210",
  country: "United States",
};

describe("shippingSchema", () => {
  it("accepts valid shipping details", () => {
    expect(shippingSchema.safeParse(validShipping).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = shippingSchema.safeParse({
      ...validShipping,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = shippingSchema.safeParse({ ...validShipping, fullName: "" });
    expect(result.success).toBe(false);
  });
});

describe("paymentSchema", () => {
  const base = {
    cardName: "Jane Doe",
    cardNumber: "4242 4242 4242 4242", // passes Luhn
    expiry: "08/40",
    cvv: "123",
  };

  it("accepts a Luhn-valid card", () => {
    expect(paymentSchema.safeParse(base).success).toBe(true);
  });

  it("rejects a card that fails the Luhn check", () => {
    const result = paymentSchema.safeParse({
      ...base,
      cardNumber: "1234 5678 9012 3456",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an expired card", () => {
    const result = paymentSchema.safeParse({ ...base, expiry: "01/20" });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed expiry", () => {
    const result = paymentSchema.safeParse({ ...base, expiry: "13/40" });
    expect(result.success).toBe(false);
  });

  it("rejects a short CVV", () => {
    const result = paymentSchema.safeParse({ ...base, cvv: "1" });
    expect(result.success).toBe(false);
  });
});
