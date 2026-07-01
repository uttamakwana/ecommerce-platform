import { useCallback, useMemo, type PropsWithChildren } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks";
import type { IProduct } from "@/features/products/types";
import { WishlistContext, type IWishlistContext } from "./wishlist-context";

export function WishlistProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useLocalStorage<IProduct[]>("wishlist-items", []);

  const has = useCallback(
    (id: IProduct["id"]) => items.some((item) => item.id === id),
    [items],
  );

  const toggle = useCallback(
    (product: IProduct) => {
      setItems((prev) => {
        if (prev.some((item) => item.id === product.id)) {
          toast(`${product.title} removed from wishlist.`);
          return prev.filter((item) => item.id !== product.id);
        }
        toast.success(`${product.title} saved to wishlist.`);
        return [product, ...prev];
      });
    },
    [setItems],
  );

  const remove = useCallback(
    (id: IProduct["id"]) =>
      setItems((prev) => prev.filter((item) => item.id !== id)),
    [setItems],
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  const value = useMemo<IWishlistContext>(
    () => ({ items, count: items.length, has, toggle, remove, clear }),
    [items, has, toggle, remove, clear],
  );

  return <WishlistContext value={value}>{children}</WishlistContext>;
}
