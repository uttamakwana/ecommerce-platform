import { ArrowLeft, Loader2, Lock, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui";
import type { TCartItem } from "@/features/products/types";
import { getDiscountedPrice } from "@/features/products/utils";
import { ProductImage } from "@/features/products/components";
import type { ShippingValues } from "./schema";

interface ReviewStepProps {
  shipping: ShippingValues;
  cardLast4: string;
  items: TCartItem[];
  isPlacing: boolean;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function ReviewStep({
  shipping,
  cardLast4,
  items,
  isPlacing,
  onBack,
  onPlaceOrder,
}: ReviewStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border p-4">
          <h3 className="mb-2 flex items-center gap-2 font-semibold">
            <MapPin className="size-4 text-primary" />
            Shipping to
          </h3>
          <p className="text-sm text-muted-foreground">
            {shipping.fullName}
            <br />
            {shipping.address}
            <br />
            {shipping.city}, {shipping.state} {shipping.zip}
            <br />
            {shipping.country}
            <br />
            {shipping.email} · {shipping.phone}
          </p>
        </section>

        <section className="rounded-2xl border p-4">
          <h3 className="mb-2 flex items-center gap-2 font-semibold">
            <CreditCard className="size-4 text-primary" />
            Payment
          </h3>
          <p className="text-sm text-muted-foreground">
            Card ending in •••• {cardLast4}
          </p>
        </section>
      </div>

      <section className="rounded-2xl border">
        <h3 className="border-b px-4 py-3 font-semibold">
          Items ({items.length})
        </h3>
        <ul className="divide-y">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 p-4">
              <ProductImage
                src={item.thumbnail}
                alt={item.title}
                wrapperClassName="size-14 shrink-0 rounded-lg border"
                className="object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  Qty {item.quantity} × ${getDiscountedPrice(item).toFixed(2)}
                </p>
              </div>
              <span className="font-semibold tabular-nums">
                ${(getDiscountedPrice(item) * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack} disabled={isPlacing}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button size="lg" onClick={onPlaceOrder} disabled={isPlacing}>
          {isPlacing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Lock className="size-4" />
          )}
          {isPlacing ? "Placing order..." : "Place order"}
        </Button>
      </div>
    </div>
  );
}
