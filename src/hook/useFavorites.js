// Archivo: src/hook/useFavorites.js
// (ESTE ES EL ARCHIVO NUEVO QUE DEBES USAR)

import { useContext, createContext } from "react";

// 1. Definimos y exportamos el Contexto aquí
export const FavoritesContext = createContext(null);

// 2. Definimos y exportamos el Hook que consume el contexto
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe ser usado dentro de un FavoritesProvider");
  }
  return context;
};
