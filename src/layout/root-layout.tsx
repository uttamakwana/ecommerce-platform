import { Outlet } from "react-router";
import { Header } from "./header";
import { Container } from "@/components/container";
import { ProductContextProvider } from "@/contexts/product/product";

export function RootLayout() {
  return (
    <div className="bg-stone-50 min-h-screen h-screen p-2">
      <ProductContextProvider>
        <Container>
          {/* Header */}
          <Header />
          {/* Outlet */}
          <Outlet />
        </Container>
      </ProductContextProvider>
    </div>
  );
}
