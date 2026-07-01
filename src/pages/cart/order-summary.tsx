import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { CartSummary } from "@/features/products/pricing";
import { PRICING } from "@/features/products/pricing";
import { cn } from "@/lib";

interface OrderSummaryProps {
  summary: CartSummary;
  /** CTA / actions rendered below the totals (e.g. checkout button). */
  children?: ReactNode;
  className?: string;
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "muted" | "success";
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-medium tabular-nums",
          accent === "success" && "text-success",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function OrderSummary({
  summary,
  children,
  className,
}: OrderSummaryProps) {
  const { subtotal, discount, shipping, tax, total, itemsTotal } = summary;
  const remainingForFreeShipping = Math.max(
    0,
    PRICING.FREE_SHIPPING_THRESHOLD - itemsTotal,
  );

  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2.5">
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          {discount > 0 && (
            <Row
              label="Discount"
              value={`-$${discount.toFixed(2)}`}
              accent="success"
            />
          )}
          <Row
            label="Shipping"
            value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            accent={shipping === 0 ? "success" : undefined}
          />
          <Row label="Tax" value={`$${tax.toFixed(2)}`} />
        </div>

        {remainingForFreeShipping > 0 && (
          <p className="rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground">
            Add ${remainingForFreeShipping.toFixed(2)} more to unlock free
            shipping.
          </p>
        )}

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-base font-semibold">Total</span>
          <span className="text-2xl font-bold tabular-nums">
            ${total.toFixed(2)}
          </span>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}
