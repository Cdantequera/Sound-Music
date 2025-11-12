import { useState } from "react";
import { getFavorites, toggleFavorite, isFavorite } from "../utils/favoritos";
import { useAuth } from "../hook/useAuth";
import { FavoritesContext } from "../hook/useFavorites";


export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || user?.email || "guest";

  const [favoritesVersion, setFavoritesVersion] = useState(0);

  const updateFavorites = () => {
    setFavoritesVersion((v) => v + 1);
  };

  const handleToggleFavorite = (trackId) => {
    toggleFavorite(trackId, userId);
    updateFavorites();
  };

  const checkIsFavorite = (trackId) => {
    return isFavorite(trackId, userId);
  };

  const favorites = getFavorites(userId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite: handleToggleFavorite,
        isFavorite: checkIsFavorite,
        favoritesVersion,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
