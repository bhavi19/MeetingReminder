import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import baseManifest from "./manifest.config.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const manifest = {
    ...baseManifest,
    oauth2: {
      client_id: env.VITE_GOOGLE_CLIENT_ID,
      scopes: [
        "https://www.googleapis.com/auth/calendar.readonly",
      ],
    },
  };

  return {
    plugins: [react(), crx({ manifest })],
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },
  };
});
