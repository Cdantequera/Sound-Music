export const preloadCriticalComponents = () => {
  // Precargar componentes que se usan frecuentemente
  const preloadPromises = [
    // Precargar rutas de usuario (más comunes)
    import("../pages/Home"),
    import("../pages/Canciones"),
    import("../pages/Albunes"),

    // Precargar componentes de autenticación
    import("../components/auth/LoginModal"),
    import("../components/auth/RegisterModal"),
  ];

  // Ejecutar precarga en segundo plano
  Promise.all(preloadPromises).catch((error) => {
    console.warn("Error precargando componentes:", error);
  });
};

// Precargar componentes de admin solo cuando sea necesario
export const preloadAdminComponents = () => {
  const adminPreloadPromises = [
    import("../pages/admin/AdminDashboard"),
    import("../pages/admin/AdminUsers"),
  ];

  Promise.all(adminPreloadPromises).catch((error) => {
    console.warn("Error precargando componentes de admin:", error);
  });
};
