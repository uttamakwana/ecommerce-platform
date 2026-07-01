import { useCallback, useMemo, type PropsWithChildren } from "react";
import { useLocalStorage } from "@/hooks";
import type { IOrder } from "@/features/products/types";
import { OrdersContext, type IOrdersContext } from "./orders-context";

export function OrdersProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useLocalStorage<IOrder[]>("orders", []);

  const getOrder = useCallback(
    (id: string) => orders.find((order) => order.id === id),
    [orders],
  );

  const placeOrder = useCallback(
    (order: IOrder) => setOrders((prev) => [order, ...prev]),
    [setOrders],
  );

  const value = useMemo<IOrdersContext>(
    () => ({ orders, getOrder, placeOrder }),
    [orders, getOrder, placeOrder],
  );

  return <OrdersContext value={value}>{children}</OrdersContext>;
}
