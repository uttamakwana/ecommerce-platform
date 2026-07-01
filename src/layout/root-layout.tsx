import { Outlet } from "react-router";
import { Header } from "./header";
import { StoreProvider } from "@/contexts";
import { CompareBar } from "@/features/products/components/compare-bar";
import { ScrollToTop } from "./scroll-to-top";

export function RootLayout() {
  return (
    <StoreProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="mx-auto w-full max-w-[1600px] flex-1">
          <Outlet />
        </main>
        <CompareBar />
      </div>
    </StoreProvider>
  );
}
