import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers"));
const AdminContent = lazy(() => import("../pages/admin/AdminContent")); // <-- NUEVO
const AdminStats = lazy(() => import("../pages/admin/AdminStats")); // <-- NUEVO
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings")); // <-- NUEVO
const NotFound = lazy(() => import("../pages/NotFound"));

const AdminLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Cargando panel de administración...</p>
    </div>
  </div>
);

function AdminRoutes() {
  return (
    <Suspense fallback={<AdminLoadingSpinner />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedAdminRoute>
              <AdminUsers />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/content"
          element={
            <ProtectedAdminRoute>
              <AdminContent />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedAdminRoute>
              <AdminStats />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AdminRoutes;
