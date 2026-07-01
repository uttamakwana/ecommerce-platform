import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";
import { Toaster } from "./components/ui/sonner.tsx";
import { ThemeProvider } from "./contexts/theme-provider.tsx";
import { ErrorBoundary } from "./components/error-boundary.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root was not found");

createRoot(rootElement).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="aurora-theme">
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);
