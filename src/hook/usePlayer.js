import { useContext, createContext } from "react";

export const PlayerContext = createContext(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (context === undefined) {
    throw new Error("usePlayer debe ser usado dentro de un PlayerProvider");
  }

  return context;
};
