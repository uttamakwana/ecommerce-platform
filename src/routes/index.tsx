import { RootLayout } from "@/layout";
import { createBrowserRouter } from "react-router";
import { Cart, Home, NoPageFound, Product } from "./routes";
import { withSuspense } from "./withSuspense";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<Home />),
      },
      {
        path: "cart",
        element: withSuspense(<Cart />),
      },
      {
        path: "/products/:id",
        element: withSuspense(<Product />),
      },
    ],
  },
  {
    path: "*",
    element: withSuspense(<NoPageFound />),
  },
]);
