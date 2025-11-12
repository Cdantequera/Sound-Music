import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import googleAuthService from "../services/googleAuth";
import { AuthContext } from "../hook/useAuth";
import bcrypt from "bcryptjs";
import { clearUserData } from "../utils/favoritos";

// 1. Crear el Proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createDefaultAdmin = async () => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const adminExists = users.some(
        (u) => u.role === "admin" || u.email === "admin@soundmusic.com"
      );

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const adminUser = {
          id: Date.now(),
          userName: "Administrador",
          email: "admin@soundmusic.com",
          password: hashedPassword,
          role: "admin",
          photoURL: null, // Usará el icono por defecto del Avatar
          createdAt: new Date().toISOString(),
        };

        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Verificar que se guardó correctamente
        const verification = JSON.parse(localStorage.getItem("users") || "[]");
        const savedAdmin = verification.find((u) => u.email === "admin@soundmusic.com");
        console.log(
          "✅ Usuario administrador creado:",
          savedAdmin ? { email: savedAdmin.email, role: savedAdmin.role } : null
        );
      } else {
        const existingAdmin = users.find((u) => u.email === "admin@soundmusic.com");
        if (existingAdmin) {
          // Actualizar admin existente para remover la foto si la tiene
          if (existingAdmin.photoURL) {
            existingAdmin.photoURL = null;
            localStorage.setItem("users", JSON.stringify(users));

            // Si el admin está logueado, actualizar también su sesión
            const currentUser = JSON.parse(localStorage.getItem("user") || "null");
            if (currentUser && currentUser.email === "admin@soundmusic.com") {
              currentUser.photoURL = null;
              localStorage.setItem("user", JSON.stringify(currentUser));
            }
          }
        }
      }
    } catch (error) {
      console.error("❌ Error al crear usuario administrador:", error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        // Crear usuario admin por defecto si no existe
        await createDefaultAdmin();
      } catch (error) {
        console.error("Error al cargar usuario de localStorage", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.provider === "google") {
        await googleAuthService.logout();
      }
    } catch (error) {
      console.error("Error al cerrar sesión de Google:", error);
    } finally {
      // Limpiar datos del usuario antes de cerrar sesión
      clearUserData();

      localStorage.removeItem("user");
      setUser(null);
      toast.success("Sesión cerrada");
      window.location.href = "/";
    }
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    if (user.role === "admin") return true;

    return user.permissions?.includes(permission) || false;
  };

  const updateUserRole = (newRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    isAdmin,
    hasPermission,
    updateUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
