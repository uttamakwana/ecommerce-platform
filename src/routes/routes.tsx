import { lazy } from "react";

export const Home = lazy(() => import("@/pages/home"));
export const Cart = lazy(() => import("@/pages/cart"));
export const Checkout = lazy(() => import("@/pages/checkout"));
export const OrderConfirmation = lazy(() => import("@/pages/order"));
export const Product = lazy(() => import("@/pages/product"));
export const Wishlist = lazy(() => import("@/pages/wishlist"));
export const Compare = lazy(() => import("@/pages/compare"));
export const NoPageFound = lazy(() => import("@/pages/not-found"));
