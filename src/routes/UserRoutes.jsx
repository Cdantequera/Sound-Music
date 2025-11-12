import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import UserLayout from "../layouts/UserLayout";

const Favoritos = lazy(() => import("../pages/Favoritos"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Tendencias = lazy(() => import("../pages/Tendencias"));
const Generos = lazy(() => import("../pages/Generos"));
const Albunes = lazy(() => import("../pages/Albunes"));
const Canciones = lazy(() => import("../pages/Canciones"));
const NotFound = lazy(() => import("../pages/NotFound"));
const GeneroDetail = lazy(() => import("../pages/GeneroDetail"));
const AlbumDetail = lazy(() => import("../pages/AlbumDetail"));
// --- 1. AÑADE ESTA LÍNEA ---
const Playlists = lazy(() => import("../pages/Playlists"));

// Componente de loading para páginas de usuario
const UserLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Cargando página...</p>
    </div>
  </div>
);

function UserRoutes() {
  return (
    <UserLayout>
      <Suspense fallback={<UserLoadingSpinner />}>
        <Routes>
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="favoritos"
            element={
              <ProtectedRoute>
                <Favoritos />
              </ProtectedRoute>
            }
          />

          {/* --- 2. AÑADE ESTE BLOQUE --- */}
          <Route
            path="playlists"
            element={
              <ProtectedRoute>
                <Playlists />
              </ProtectedRoute>
            }
          />
          {/* (Puedes añadir la ruta de detalle a futuro si quieres) */}
          {/* <Route
            path="playlist/:id" 
            element={
              <ProtectedRoute>
                <PlaylistDetail />
              </ProtectedRoute>
            }
          />
          */}

          <Route
            path="about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="tendencias"
            element={
              <ProtectedRoute>
                <Tendencias />
              </ProtectedRoute>
            }
          />
          <Route
            path="generos"
            element={
              <ProtectedRoute>
                <Generos />
              </ProtectedRoute>
            }
          />
          <Route
            path="genero/:id"
            element={
              <ProtectedRoute>
                <GeneroDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="albunes"
            element={
              <ProtectedRoute>
                <Albunes />
              </ProtectedRoute>
            }
          />
          <Route
            path="canciones"
            element={
              <ProtectedRoute>
                <Canciones />
              </ProtectedRoute>
            }
          />

          <Route
            path="album/:id"
            element={
              <ProtectedRoute>
                <AlbumDetail />
              </ProtectedRoute>
            }
          />
          {/* Ruta específica para 404 */}
          <Route path="404" element={<NotFound />} />

          {/* 404 para todas las rutas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </UserLayout>
  );
}

export default UserRoutes;
