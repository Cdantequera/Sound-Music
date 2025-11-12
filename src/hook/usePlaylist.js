import { useContext, createContext } from "react";

export const PlaylistContext = createContext(null);

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error("usePlaylist debe ser usado dentro de un PlaylistProvider");
  }

  return context;
};
