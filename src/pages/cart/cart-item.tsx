import {
    Button,
    Card,
} from "@/components/ui";
import { Trash2 } from "lucide-react";
import type { IProduct, TCartItem } from "@/features/products/types";
import { getDiscountedPrice } from "@/features/products/utils";
import { CartItemQuantity } from "./cart-item-quantity";

type TCartItemProps = {
    product: IProduct;
    quantity: number;
    onIncrease?: () => void;
    onDecrease?: () => void;
    onRemove?: (id: TCartItem["id"]) => void;
}

export function CartItem({
    product,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
}: TCartItemProps) {
    const discountedPrice = getDiscountedPrice(product);
    const total = discountedPrice * quantity;

    return (
        <Card className="flex flex-col gap-4 p-4 sm:flex-row">
            <div>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="size-28 rounded-lg border object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {product.brand}
                    </p>

                    <h3 className="text-lg font-semibold">
                        {product.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <CartItemQuantity quantity={quantity} onIncrease={onIncrease} onDecrease={onDecrease} />

                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            ${discountedPrice.toFixed(2)} each
                        </p>

                        <p className="text-2xl font-bold">
                            ${total.toFixed(2)}
                        </p>
                    </div>

                    <div className="ml-auto">
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => onRemove?.(product.id)}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}