import { createContext, useContext } from "react";

// --- Autenticación ---
export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

// --- Modales ---
export const ModalContext = createContext();
export const useModals = () => {
  return useContext(ModalContext);
};

// --- Búsqueda ---
export const SearchContext = createContext();
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch debe ser usado dentro de un SearchProvider");
  }
  return context;
};
