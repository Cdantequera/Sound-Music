import { useState, useEffect } from "react";
import { usePlaylist } from "../../hook/usePlaylist";
import { X, Music, Plus } from "lucide-react";

function AddToPlaylistModal() {
  const { isModalOpen, trackToAdd, closePlaylistModal, addTrackToPlaylist } = usePlaylist();
  const [playlists, setPlaylists] = useState([]);

  // Cargar las playlists del usuario cuando se abre el modal
  useEffect(() => {
    if (isModalOpen) {
      const savedPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]");
      setPlaylists(savedPlaylists);
    }
  }, [isModalOpen]);

  if (!isModalOpen || !trackToAdd) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center p-4"
      onClick={closePlaylistModal} // Cierra al hacer clic fuera
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Añadir a playlist</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
              {trackToAdd.name}
            </p>
          </div>
          <button
            type="button"
            onClick={closePlaylistModal}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de Playlists */}
        <div className="p-4 max-h-64 overflow-y-auto">
          {playlists.length > 0 ? (
            <div className="flex flex-col gap-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => addTrackToPlaylist(playlist.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <Music size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{playlist.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {playlist.tracks.length} canciones
                    </p>
                  </div>
                  <Plus size={18} className="ml-auto text-gray-500" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-6">
              No has creado ninguna playlist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;
