import { useState, useEffect } from "react";
import { X, Heart, Play, Trash2, Search, Music } from "lucide-react";

function FavoritosModal({ isOpen, onClose }) {
  const [favoritos, setFavoritos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPlaying, setCurrentPlaying] = useState(null);

  // Cargar favoritos del localStorage
  useEffect(() => {
    const savedFavoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritos(savedFavoritos);
  }, [isOpen]);

  // Filtrar favoritos por búsqueda
  const filteredFavoritos = favoritos.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Eliminar de favoritos
  const removeFavorito = (songId) => {
    const newFavoritos = favoritos.filter((song) => song.id !== songId);
    setFavoritos(newFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(newFavoritos));

    // Actualizar también el estado global de liked songs si existe
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs") || "[]");
    const updatedLikedSongs = likedSongs.filter((id) => id !== songId);
    localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
  };

  // Reproducir canción
  const handlePlay = (songId) => {
    setCurrentPlaying(currentPlaying === songId ? null : songId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-r from-pink-500 to-purple-600 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Favoritos</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {favoritos.length} canciones guardadas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Búsqueda */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar en favoritos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Lista de favoritos */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {filteredFavoritos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? "No se encontraron canciones" : "No tienes favoritos aún"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "Agrega canciones a favoritos desde la página de canciones"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFavoritos.map((song) => (
                <div
                  key={song.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Número/Play Button */}
                    <div className="w-12 flex items-center justify-center">
                      {currentPlaying === song.id ? (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-pink-600 animate-pulse"></div>
                            <div
                              className="w-1 h-3 bg-pink-600 animate-pulse"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1 h-5 bg-pink-600 animate-pulse"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePlay(song.id)}
                          className="w-8 h-8 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </button>
                      )}
                    </div>

                    {/* Información de la canción */}
                    <div className="flex items-center flex-1 min-w-0">
                      <img
                        src={
                          song.cover ||
                          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
                        }
                        alt={song.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop";
                        }}
                      />
                      <div className="ml-4 min-w-0 flex-1">
                        <h3
                          className={`font-medium truncate ${currentPlaying === song.id ? "text-pink-600 dark:text-pink-400" : "text-gray-900 dark:text-white"}`}
                        >
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    {/* Álbum */}
                    <div className="hidden md:block w-48 px-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {song.album || "Álbum desconocido"}
                      </p>
                    </div>

                    {/* Duración */}
                    <div className="w-16 px-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {song.duration || "0:00"}
                      </p>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFavorito(song.id)}
                        className="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Quitar de favoritos"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredFavoritos.length} de {favoritos.length} canciones
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritosModal;
