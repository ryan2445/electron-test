import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: __dirname,
  build: {
    ssr: true,
    outDir: "../../dist/main",
    emptyOutDir: true,
    lib: {
      entry: "./index.ts",
      formats: ["es"],
    },
  },
});
