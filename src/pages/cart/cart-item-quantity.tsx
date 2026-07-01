import { Button } from "@/components/ui";
import { Minus, Plus } from "lucide-react";

type TCartItemQuantityProps = {
  quantity: number;
  /** Upper bound (available stock); disables the increment at the cap. */
  max?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

export function CartItemQuantity({
  quantity,
  max,
  onIncrease,
  onDecrease,
}: TCartItemQuantityProps) {
  const atMax = max !== undefined && quantity >= max;

  return (
    <div className="flex items-center rounded-lg border">
      <Button
        size="icon"
        variant="ghost"
        className="size-9 rounded-r-none"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </Button>

      <span
        className="w-10 text-center text-sm font-medium tabular-nums"
        aria-live="polite"
      >
        {quantity}
      </span>

      <Button
        size="icon"
        variant="ghost"
        className="size-9 rounded-l-none"
        onClick={onIncrease}
        disabled={atMax}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
