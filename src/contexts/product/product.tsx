import { useCallback, useState, type PropsWithChildren } from "react";
import {
  ProductContext
} from "./useProductFilters";
import { useSearchParams } from "react-router";
import type { THandleSearchParamChangeKey } from "./type";
import type { TCartItem } from "@/features/products/types";
import { toast } from "sonner";

type TProductContextProvider = PropsWithChildren;
export const ProductContextProvider = ({
  children,
}: TProductContextProvider) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const getCartItem = (productId: TCartItem["id"]) => cartItems.find((item) => item.id === productId);

  const handleAddToCart = useCallback((item: TCartItem) => {
    toast.success(`${item.title} added to cart!`);
    setCartItems((prevItems) => [...prevItems, item]);
  }, []);

  const handleChangeQuantity = useCallback((itemId: TCartItem["id"], newQuantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => {
      if (item.id === itemId) {
        if (newQuantity > item.stock) {
          toast.error(`Cannot add more than ${item.stock} items to the cart.`);
          return item;
        }

        return { ...item, quantity: newQuantity };
      } return item;
    }));
  }, []);

  const handleRemoveFromCart = useCallback((itemId: TCartItem["id"]) => {
    setCartItems((prevItems) => prevItems.filter((item) => {
      if (item.id === itemId) {
        toast.success(`${item.title} removed from cart!`);
        return false;
      };

      return true;
    }))
  }, [])

  const handleChangeSearchParams = useCallback(
    (updates: Partial<THandleSearchParamChangeKey>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  return (
    <ProductContext
      value={{
        getCartItem,
        searchParams,
        handleChangeSearchParams,
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleChangeQuantity,
      }}
    >
      {children}
    </ProductContext>
  );
};
