import { Link } from "react-router";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { useCart } from "@/contexts";
import { CartItem } from "./cart-item";
import { OrderSummary } from "./order-summary";

export default function Cart() {
  const { items, summary, setQuantity, removeItem, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <ProductNotFound
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Let's fix that."
          actionLabel="Start shopping"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <ShoppingBag className="size-6" />
            Your cart
          </h1>
          <p className="text-sm text-muted-foreground">
            {summary.itemCount} item{summary.itemCount === 1 ? "" : "s"}
          </p>
        </div>
        <Button variant="ghost" onClick={clear}>
          <Trash2 className="size-4" />
          Clear cart
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => setQuantity(item.id, item.quantity + 1)}
              onDecrease={() => setQuantity(item.id, item.quantity - 1)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary summary={summary}>
            <Button asChild size="lg" className="w-full">
              <Link to="/checkout">
                Proceed to checkout
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/">Continue shopping</Link>
            </Button>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
