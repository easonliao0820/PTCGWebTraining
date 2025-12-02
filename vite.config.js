import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
      "@img": path.resolve(__dirname, "src/assets/images"),
    },
  },
});
