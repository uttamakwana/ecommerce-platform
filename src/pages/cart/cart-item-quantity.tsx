import { Button, Input } from "@/components/ui";
import { Minus, Plus } from "lucide-react";

type TCartItemQuantityProps = {
    quantity: number;
    onIncrease?: () => void;
    onDecrease?: () => void;
}

export function CartItemQuantity({ quantity, onIncrease, onDecrease }: TCartItemQuantityProps) {
    return <div className="flex items-center gap-2">
        <Button
            size="icon"
            variant="outline"
            onClick={onDecrease}
            disabled={quantity <= 1}
        >
            <Minus className="size-4" />
        </Button>

        <Input
            readOnly
            value={quantity}
            className="w-16 text-center"
        />

        <Button
            size="icon"
            variant="outline"
            onClick={onIncrease}
        >
            <Plus className="size-4" />
        </Button>
    </div>
}