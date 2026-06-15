import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "OnJarama Path",
        short_name: "OJ Path",
        description: "Coach financier intelligent OnJarama",
        theme_color: "#071426",
        background_color: "#071426",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/onjarama-path-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/onjarama-path-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  server: {
    host: "0.0.0.0",
    port: 5173,
  },

  build: {
    outDir: "dist",
  },
});