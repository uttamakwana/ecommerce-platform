import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import { Button, Card } from "@/components/ui";
import type { TCartItem } from "@/features/products/types";
import { getDiscountedPrice } from "@/features/products/utils";
import { CartItemQuantity } from "./cart-item-quantity";

type TCartItemProps = {
  item: TCartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: TCartItemProps) {
  const unitPrice = getDiscountedPrice(item);
  const lineTotal = unitPrice * item.quantity;

  return (
    <Card className="flex flex-row gap-4 p-3 sm:p-4">
      <Link to={`/products/${item.id}`} className="shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="size-24 rounded-xl border object-cover sm:size-28"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {item.brand ?? item.category}
            </p>
            <Link
              to={`/products/${item.id}`}
              className="line-clamp-1 font-semibold hover:text-primary"
            >
              {item.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              ${unitPrice.toFixed(2)} each
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label={`Remove ${item.title}`}
            onClick={onRemove}
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <CartItemQuantity
            quantity={item.quantity}
            max={item.stock}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
          <span className="text-lg font-bold tabular-nums">
            ${lineTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
}
