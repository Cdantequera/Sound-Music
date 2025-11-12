import { useContext } from "react";
import { FavoritesContext } from "../hook/useFavorites";
export const useModalFav = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useModalFav debe ser usado dentro de FavoritesProvider");
  }
  return context;
};
