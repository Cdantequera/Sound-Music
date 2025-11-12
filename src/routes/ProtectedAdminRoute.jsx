import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

function ProtectedAdminRoute({ children, redirectTo = "/" }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;
