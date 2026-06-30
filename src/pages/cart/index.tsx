import { useProductFilter } from "@/contexts/product/useProductFilters";
import { CartItem } from "./cart-item";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { CartSummary } from "./cart-summary";
import { getDiscountedPrice } from "@/features/products/utils";

export function Cart() {
    const { cartItems, handleRemoveFromCart, handleChangeQuantity } = useProductFilter();
    const hasCartItems = cartItems.length > 0;
    const { subTotal, discount, shipping, tax } = cartItems.reduce((acc, item) => {
        const discountedPrice = getDiscountedPrice(item);
        acc.subTotal += discountedPrice * item.quantity;
        acc.discount += (item.price * item.discountPercentage / 100) * item.quantity;
        acc.shipping += 10 * item.quantity; // Assuming a flat shipping rate of $10 per item
        acc.tax += (discountedPrice * 0.1) * item.quantity; // Assuming a flat tax rate of 10%
        return acc;
    }, { subTotal: 0, discount: 0, shipping: 0, tax: 0 });

    return <div className="flex flex-col gap-4 pb-4">
        {!hasCartItems && <ProductNotFound title="Cart is empty" description="Kindly look into our products" actionLabel="Go to Products" />}

        <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col gap-4 px-4 flex-1">
                {cartItems.map((item) => <CartItem key={item.id} product={item} quantity={item.quantity} onRemove={handleRemoveFromCart} onIncrease={() => handleChangeQuantity(item.id, item.quantity + 1)} onDecrease={() => handleChangeQuantity(item.id, item.quantity - 1)} />)}
            </div>

            {hasCartItems && <CartSummary subTotal={subTotal} discount={discount} shipping={shipping} tax={tax} />
            }</div>
    </div>
}