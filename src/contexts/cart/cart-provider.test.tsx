import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { CartProvider } from "./cart-provider";
import { useCart } from "./cart-context";
import type { IProduct } from "@/features/products/types";

// Toasts are side effects we don't care about here.
vi.mock("sonner", () => ({
  toast: Object.assign(() => {}, { success: () => {}, error: () => {} }),
}));

const product = (overrides: Partial<IProduct> = {}): IProduct =>
  ({
    id: 1,
    title: "Test Product",
    price: 100,
    discountPercentage: 0,
    stock: 5,
    thumbnail: "",
    ...overrides,
  }) as IProduct;

function setup() {
  const wrapper = ({ children }: PropsWithChildren) => (
    <CartProvider>{children}</CartProvider>
  );
  return renderHook(() => useCart(), { wrapper });
}

describe("CartProvider", () => {
  it("adds a new item with quantity 1", () => {
    const { result } = setup();
    act(() => result.current.addItem(product()));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
  });

  it("merges quantity instead of duplicating when adding the same product", () => {
    const { result } = setup();
    act(() => result.current.addItem(product()));
    act(() => result.current.addItem(product()));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("never lets quantity exceed available stock", () => {
    const { result } = setup();
    act(() => result.current.addItem(product({ stock: 2 }), 5));
    expect(result.current.items[0].quantity).toBe(2);
    act(() => result.current.setQuantity(1, 10));
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("removes the line when quantity drops below 1", () => {
    const { result } = setup();
    act(() => result.current.addItem(product()));
    act(() => result.current.setQuantity(1, 0));
    expect(result.current.items).toHaveLength(0);
  });

  it("removeItem deletes the line", () => {
    const { result } = setup();
    act(() => result.current.addItem(product()));
    act(() => result.current.removeItem(1));
    expect(result.current.isInCart(1)).toBe(false);
  });

  it("clear empties the cart", () => {
    const { result } = setup();
    act(() => result.current.addItem(product({ id: 1 })));
    act(() => result.current.addItem(product({ id: 2 })));
    act(() => result.current.clear());
    expect(result.current.items).toHaveLength(0);
  });

  it("persists the cart to localStorage", () => {
    const { result } = setup();
    act(() => result.current.addItem(product()));
    expect(localStorage.getItem("cart-items")).toContain("Test Product");
  });
});
