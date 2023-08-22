import { resolve } from "node:path";
import macrosPlugin from "vite-plugin-babel-macros";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import packageJson from "./package.json" assert { type: "json" };
// https://vitejs.dev/config/

export default defineConfig(() => ({
  plugins: [react(), macrosPlugin()],
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: resolve("src", "components/index.ts"),
      name: "ReactViteLibrary",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `react-vite-library.${format}.js`,
    },
    manifest: true,
    rollupOptions: {
      external: [...Object.keys(packageJson.dependencies)],
    },
  },
}));
