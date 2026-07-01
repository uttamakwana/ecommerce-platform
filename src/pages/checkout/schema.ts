import { z } from "zod";

/** Shipping + contact details (step 1). */
export const shippingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^[+\d][\d\s()-]{6,}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter your street address"),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().trim().min(2, "Enter your state / region"),
  zip: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9 -]{3,10}$/, "Enter a valid postal code"),
  country: z.string().trim().min(2, "Enter your country"),
});

/** Digits-only card number, validated with the Luhn checksum. */
function isLuhnValid(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

/** Payment details (step 2). Never persisted beyond the last 4 digits. */
export const paymentSchema = z.object({
  cardName: z.string().trim().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .refine((v) => isLuhnValid(v), "Enter a valid card number"),
  expiry: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
    .refine((value) => {
      const [mm, yy] = value.split("/").map(Number);
      const expiry = new Date(2000 + yy, mm); // first day of the month after
      return expiry > new Date();
    }, "Card has expired"),
  cvv: z
    .string()
    .trim()
    .regex(/^\d{3,4}$/, "Enter a valid CVV"),
});

export type ShippingValues = z.infer<typeof shippingSchema>;
export type PaymentValues = z.infer<typeof paymentSchema>;
