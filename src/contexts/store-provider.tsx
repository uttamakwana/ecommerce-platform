import type { PropsWithChildren } from "react";
import { CartProvider } from "./cart/cart-provider";
import { WishlistProvider } from "./wishlist/wishlist-provider";
import { CompareProvider } from "./compare/compare-provider";
import { OrdersProvider } from "./orders/orders-provider";

/**
 * Composes the client-side stores. They are separate contexts (not one mega
 * context) so, e.g., a wishlist change never re-renders cart consumers.
 */
export function StoreProvider({ children }: PropsWithChildren) {
  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <OrdersProvider>{children}</OrdersProvider>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
