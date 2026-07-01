import { createContext, use } from "react";
import type { IOrder } from "@/features/products/types";

export interface IOrdersContext {
  orders: IOrder[];
  getOrder: (id: string) => IOrder | undefined;
  placeOrder: (order: IOrder) => void;
}

export const OrdersContext = createContext<IOrdersContext | null>(null);

export function useOrders() {
  const context = use(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
