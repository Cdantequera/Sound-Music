import { useState } from "react";
import { X, Trash2, Search, Music } from "lucide-react";
import { usePlayer } from "../../hook/usePlayer";
import SongCard from "../common/SongCard";

function SongListModal({ isOpen, onClose, title, tracks = [], onRemoveTrack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const filteredTracks = tracks.filter(
    (song) =>
      (song.name || song.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (song.artist || song.artists?.[0]?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  const handleRemove = (songId) => {
    if (onRemoveTrack) {
      onRemoveTrack(songId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header (Sin cambios) */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-r from-pink-500 to-purple-600 rounded-xl">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{tracks.length} canciones</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Búsqueda (Sin cambios) */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar en la playlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredTracks.length === 0 ? (
            // Estado vacío (Sin cambios)
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm ? "No se encontraron canciones" : "Playlist vacía"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "Añade canciones desde el reproductor."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTracks.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <SongCard
                      track={song}
                      onPlay={() => playTrack(song)}
                      isPlaying={currentTrack?.id === song.id && isPlaying}
                    />
                  </div>

                  {/* Botón de eliminar (separado) */}
                  <div className="ml-4 shrink-0">
                    <button
                      onClick={() => handleRemove(song.id)}
                      className="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Quitar de la playlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredTracks.length} de {tracks.length} canciones
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

export default SongListModal;
