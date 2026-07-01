import { useCallback, useMemo, type PropsWithChildren } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks";
import type { IProduct } from "@/features/products/types";
import {
  CompareContext,
  MAX_COMPARE,
  type ICompareContext,
} from "./compare-context";

export function CompareProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useLocalStorage<IProduct[]>("compare-items", []);

  const has = useCallback(
    (id: IProduct["id"]) => items.some((item) => item.id === id),
    [items],
  );

  const toggle = useCallback(
    (product: IProduct) => {
      setItems((prev) => {
        if (prev.some((item) => item.id === product.id)) {
          return prev.filter((item) => item.id !== product.id);
        }
        if (prev.length >= MAX_COMPARE) {
          toast.error(`You can compare up to ${MAX_COMPARE} products.`);
          return prev;
        }
        return [...prev, product];
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

  const value = useMemo<ICompareContext>(
    () => ({
      items,
      count: items.length,
      has,
      canAdd: items.length < MAX_COMPARE,
      toggle,
      remove,
      clear,
    }),
    [items, has, toggle, remove, clear],
  );

  return <CompareContext value={value}>{children}</CompareContext>;
}
