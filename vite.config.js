import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // ✅ ESTO ARREGLA EL ERROR EN LOCAL (npm run dev)
  server: {
    proxy: {
      "/api/deezer": {
        target: "https://api.deezer.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/deezer/, ""),
      },
    },
  },

  build: {
    // Aumentar el límite de advertencia a 1000 kB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Configuración manual de chunks para optimizar el bundle
        manualChunks: (id) => {
          // Separar node_modules en chunks específicos
          if (id.includes("node_modules")) {
            // React y ReactDOM
            if (id.includes("react") && !id.includes("react-router")) {
              return "react-vendor";
            }

            // React Router
            if (id.includes("react-router")) {
              return "router-vendor";
            }

            // Firebase
            if (id.includes("firebase")) {
              return "firebase-vendor";
            }

            // Librerías de UI y forms
            if (
              id.includes("react-hook-form") ||
              id.includes("@hookform") ||
              id.includes("react-toastify") ||
              id.includes("lucide-react")
            ) {
              return "ui-vendor";
            }

            // Librerías de utilidades
            if (id.includes("zod") || id.includes("bcryptjs")) {
              return "utils-vendor";
            }

            // Otras librerías grandes
            return "vendor";
          }
        },
      },
    },
    
  },
});