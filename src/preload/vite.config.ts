import { defineConfig } from "vite";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: __dirname,
  build: {
    ssr: true,
    outDir: "../../dist/preload",
    emptyOutDir: true,
    lib: {
      entry: "./preload.ts",
      formats: ["cjs"],
    },
  },
});
