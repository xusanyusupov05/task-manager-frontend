import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      app: path.resolve(import.meta.dirname, "src/app"),
      shared: path.resolve(import.meta.dirname, "src/shared"),
      widgets: path.resolve(import.meta.dirname, "src/widgets"),
      pages: path.resolve(import.meta.dirname, "src/pages"),
    },
  },
  server: {
    host: true
  }
});