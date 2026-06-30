import { useCallback, type PropsWithChildren } from "react";
import {
  ProductContext
} from "./useProductFilters";
import { useSearchParams } from "react-router";
import type { THandleSearchParamChangeKey } from "./type";

type TProductContextProvider = PropsWithChildren;
export const ProductContextProvider = ({
  children,
}: TProductContextProvider) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log({ searchParams });

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
        searchParams,
        handleChangeSearchParams,
      }}
    >
      {children}
    </ProductContext>
  );
};
