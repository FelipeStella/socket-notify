import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./example", // ⬅️ define o root como o playground
  resolve: {
    dedupe: ["react", "react-dom"]
  },
  build: {
    outDir: "../example-dist",
    emptyOutDir: true
  }
});
