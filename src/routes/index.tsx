import { RootLayout } from "@/layout";
import { Home, NoPageFound, Product } from "@/pages";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
    ],
  },
  {
    path: "*",
    element: <NoPageFound />,
  },
]);
