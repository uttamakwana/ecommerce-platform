import { lazy } from "react";

export const Home = lazy(() => import("@/pages/home"));
export const Cart = lazy(() => import("@/pages/cart"));
export const Product = lazy(() => import("@/pages/product"));
export const NoPageFound = lazy(() => import("@/pages/not-found"));
