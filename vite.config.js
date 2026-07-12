import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        manualChunks(id) {

          if (id.includes("node_modules")) {

            if (id.includes("react")) {
              return "react";
            }

            if (id.includes("gsap")) {
              return "gsap";
            }

            if (
              id.includes("react-icons") ||
              id.includes("lucide-react")
            ) {
              return "icons";
            }

            if (
              id.includes("socket.io") ||
              id.includes("simple-peer")
            ) {
              return "video";
            }

            if (
              id.includes("@formspree")
            ) {
              return "form";
            }

            return "vendor";
          }
        },
      },
    },
  },
});