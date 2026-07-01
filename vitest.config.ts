import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Dedicated test config: the app's Vite config runs the React Compiler babel
// pass, which we skip here to keep the test transform fast and simple.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
