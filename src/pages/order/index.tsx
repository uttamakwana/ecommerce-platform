import { useEffect } from "react";
import { Link, useParams } from "react-router";
import confetti from "canvas-confetti";
import { Package, Truck, Home } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { ProductImage } from "@/features/products/components";
import { useOrders } from "@/contexts";
import { CheckSVG } from "@/pages/cart/check-svg";

function fireCelebration() {
  const end = Date.now() + 1200;
  const colors = ["#7c3aed", "#db2777", "#f59e0b"];
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

function deliveryWindow(createdAt: string): string {
  const base = new Date(createdAt);
  if (Number.isNaN(base.getTime())) return "within 3–5 business days";
  const from = new Date(base);
  from.setDate(from.getDate() + 3);
  const to = new Date(base);
  to.setDate(to.getDate() + 5);
  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${fmt(from)} – ${fmt(to)}`;
}

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  useEffect(() => {
    if (order) fireCelebration();
  }, [order]);

  if (!order) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <ProductNotFound
          title="Order not found"
          description="We couldn't find this order. It may have been placed on another device."
          actionLabel="Back to shop"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 grid size-20 place-items-center rounded-full bg-success/15 text-success">
          <CheckSVG />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Order confirmed! 🎉
        </h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for your purchase, {order.shipping.fullName.split(" ")[0]}. A
          confirmation was sent to {order.shipping.email}.
        </p>
      </div>

      <Card>
        <CardContent className="grid gap-4 py-6 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Package className="size-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Order ID</p>
              <p className="text-sm text-muted-foreground">{order.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="size-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Estimated delivery</p>
              <p className="text-sm text-muted-foreground">
                {deliveryWindow(order.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <ul className="divide-y">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <ProductImage
                  src={item.thumbnail}
                  alt={item.title}
                  wrapperClassName="size-12 shrink-0 rounded-lg border"
                  className="object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty {item.quantity}
                  </p>
                </div>
                <span className="font-semibold tabular-nums">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-1.5 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">
                ${order.totals.subtotal.toFixed(2)}
              </dd>
            </div>
            {order.totals.discount > 0 && (
              <div className="flex justify-between text-success">
                <dt>Discount</dt>
                <dd className="tabular-nums">
                  -${order.totals.discount.toFixed(2)}
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="tabular-nums">
                {order.totals.shipping === 0
                  ? "Free"
                  : `$${order.totals.shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="tabular-nums">${order.totals.tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums">${order.totals.total.toFixed(2)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Button asChild size="lg" className="w-full">
        <Link to="/">
          <Home className="size-4" />
          Continue shopping
        </Link>
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        This is a demo store — no payment was processed and no real order was
        placed.
      </p>
    </div>
  );
}
