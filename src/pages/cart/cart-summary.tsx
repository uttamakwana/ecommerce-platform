import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useState } from "react";
import { CheckoutModal } from "./checkout-modal";
import { ConfettiFireworks } from "./confetti-fireworks";

type TCartSummaryProps = {
  subTotal: number;
  discount: number;
  shipping?: number;
  tax?: number;
  onCheckout?: () => void;
};

export function CartSummary({
  subTotal,
  discount,
  shipping = 0,
  tax = 0,
}: TCartSummaryProps) {
  const total = subTotal - discount + shipping + tax;
  const [open, setOpen] = useState(false);

  return (
    <Card className="sticky flex-1 max-w-full sm:max-w-60 mx-4 sm:mx-0 self-stretch sm:self-start">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>

            <span>${subTotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Discount</span>

            <span className="text-green-600">-${discount.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>

            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tax</span>

            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-lg font-semibold">Total</span>

          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>

        <ConfettiFireworks
          onClick={() => {
            setOpen(true);
          }}
        />

        <CheckoutModal open={open} onOpenChange={setOpen} />
      </CardContent>
    </Card>
  );
}
