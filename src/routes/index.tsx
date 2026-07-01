import { RootLayout } from "@/layout";
import { createBrowserRouter } from "react-router";
import {
  Cart,
  Checkout,
  Compare,
  Home,
  NoPageFound,
  OrderConfirmation,
  Product,
  Wishlist,
} from "./routes";
import { withSuspense } from "./withSuspense";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "cart", element: withSuspense(<Cart />) },
      { path: "checkout", element: withSuspense(<Checkout />) },
      { path: "order/:id", element: withSuspense(<OrderConfirmation />) },
      { path: "products/:id", element: withSuspense(<Product />) },
      { path: "wishlist", element: withSuspense(<Wishlist />) },
      { path: "compare", element: withSuspense(<Compare />) },
      { path: "*", element: withSuspense(<NoPageFound />) },
    ],
  },
]);
