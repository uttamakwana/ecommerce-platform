import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";
import { Toaster } from "./components/ui/sonner.tsx";
import { ThemeProvider } from "./contexts/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </QueryClientProvider>,
);
