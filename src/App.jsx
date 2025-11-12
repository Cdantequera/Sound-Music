import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import { PlayerProvider } from "./context/PlayerContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ModalProvider } from "./context/ModalContext";
// --- 1. Importa el nuevo Provider ---
import { PlaylistProvider } from "./context/PlaylistContext";

import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
// --- 2. Importa el nuevo Modal ---
import AddToPlaylistModal from "./components/modals/AddToPlaylistModal";
import Footer from "./components/Footer/Footer";
// Lazy loading para componentes no críticos
const Landing = lazy(() => import("./pages/Landing"));
const UserRoutes = lazy(() => import("./routes/UserRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

// --- ESTA ES LA PARTE QUE FALTABA ---
const GlobalLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gradient-to-r from-pink-600 to-purple-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando Sound-Music...</p>
    </div>
  </div>
);
// --- FIN DE LA PARTE QUE FALTABA ---

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (savedTheme === "auto") {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-500 text-white overflow-hidden">
      <ModalProvider>
        {/* --- 3. Envuelve la app con el Provider --- */}
        <PlaylistProvider>
          <PlayerProvider>
            <FavoritesProvider>
              <Suspense fallback={<GlobalLoadingSpinner />}>
                {" "}
                {/* Esta línea ahora funcionará */}
                <Routes>
                  {/* Landing Page */}
                  <Route path="/" element={<Landing />} />

                  {/* Rutas de Admin  */}
                  <Route path="/admin/*" element={<AdminRoutes />} />

                  {/* Rutas de Usuario (con layout) */}
                  <Route path="/*" element={<UserRoutes />} />
                </Routes>
              </Suspense>
            </FavoritesProvider>
          </PlayerProvider>

          {!isAdminPage && (
            <>
              <LoginModal />
              <RegisterModal />
            </>
          )}

          {/* --- 4. Renderiza el Modal aquí --- */}
          <AddToPlaylistModal />

          {/* Toast Notifications */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </PlaylistProvider>
      </ModalProvider>
      <Footer />
    </div>
  );
}

export default App;
