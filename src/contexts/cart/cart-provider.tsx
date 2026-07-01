import { useCallback, useMemo, type PropsWithChildren } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks";
import type { IProduct, TCartItem } from "@/features/products/types";
import { computeCartSummary } from "@/features/products/pricing";
import { CartContext, type ICartContext } from "./cart-context";

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useLocalStorage<TCartItem[]>("cart-items", []);

  const getItem = useCallback(
    (id: IProduct["id"]) => items.find((item) => item.id === id),
    [items],
  );

  const isInCart = useCallback(
    (id: IProduct["id"]) => items.some((item) => item.id === id),
    [items],
  );

  const addItem = useCallback(
    (product: IProduct, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);

        // Merge into the existing line instead of creating a duplicate.
        if (existing) {
          const nextQty = Math.min(existing.quantity + quantity, product.stock);
          if (nextQty === existing.quantity) {
            toast.error(`Only ${product.stock} in stock.`);
            return prev;
          }
          toast.success(`Updated ${product.title} quantity.`);
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: nextQty } : item,
          );
        }

        toast.success(`${product.title} added to cart!`);
        return [
          ...prev,
          { ...product, quantity: Math.min(quantity, product.stock) },
        ];
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: IProduct["id"]) => {
      setItems((prev) => {
        const target = prev.find((item) => item.id === id);
        if (target) toast.success(`${target.title} removed from cart.`);
        return prev.filter((item) => item.id !== id);
      });
    },
    [setItems],
  );

  const setQuantity = useCallback(
    (id: IProduct["id"], quantity: number) => {
      setItems((prev) =>
        prev.flatMap((item) => {
          if (item.id !== id) return [item];
          // Removing the last unit deletes the line.
          if (quantity < 1) return [];
          if (quantity > item.stock) {
            toast.error(`Only ${item.stock} in stock.`);
            return [item];
          }
          return [{ ...item, quantity }];
        }),
      );
    },
    [setItems],
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  const value = useMemo<ICartContext>(() => {
    const summary = computeCartSummary(items);
    return {
      items,
      totalItems: summary.itemCount,
      summary,
      getItem,
      isInCart,
      addItem,
      removeItem,
      setQuantity,
      clear,
    };
  }, [items, getItem, isInCart, addItem, removeItem, setQuantity, clear]);

  return <CartContext value={value}>{children}</CartContext>;
}
