import { useState } from "react";
import { SearchContext } from "../hook/useAuth";
import { searchMusic } from "../services/deezerApi";

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchTerm) => {
    // Verificamos si searchTerm es nulo O un string vacío

    if (!searchTerm || searchTerm.trim() === "") {
      setSearchResults([]);
      setHasSearched(false); // Resetea el estado
      setIsLoading(false); // Resetea el loading
      return; // Termina la función aquí
    }

    // Si hay un término de búsqueda, continúa normalmente
    setIsLoading(true);
    setHasSearched(true);
    const results = await searchMusic(searchTerm);
    setSearchResults(results);
    setIsLoading(false);
  };

  const value = {
    searchResults,
    isLoading,
    hasSearched,
    handleSearch,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
