import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Optional web-app dev/build (non-extension) for local testing.
export default defineConfig({
  plugins: [react()],
});
