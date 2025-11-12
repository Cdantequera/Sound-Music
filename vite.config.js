import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
    // Optimizaciones adicionales
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.log en producción
        drop_debugger: true,
      },
    },
  },
});
