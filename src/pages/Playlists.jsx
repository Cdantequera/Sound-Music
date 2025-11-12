import { useState, useEffect } from "react";
import { Plus, X, Music, ChevronRight } from "lucide-react";
import Button from "../components/common/Button";
import SongListModal from "../components/modals/SongListModal";

const CreatePlaylistModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Crear nueva playlist
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <label
              htmlFor="playlistName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Nombre de la playlist
            </label>
            <input
              type="text"
              id="playlistName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Rock Argentino"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente de la tarjeta de playlist
// --- 2. Hacemos que reciba 'onClick' como prop ---
const PlaylistCard = ({ playlist, onClick }) => {
  const trackCount = playlist.tracks?.length || 0;

  return (
    <div
      onClick={onClick} // Usamos el onClick que nos pasan
      className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-lg p-4 flex items-center justify-between shadow-lg hover:bg-white/20 dark:hover:bg-gray-700/60 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
          <Music size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
          <p className="text-sm text-gray-300 dark:text-gray-400">{trackCount} canciones</p>
        </div>
      </div>
      <ChevronRight
        size={20}
        className="text-gray-300 dark:text-gray-400 group-hover:text-white transition-colors"
      />
    </div>
  );
};

// Página principal de Playlists
function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  // --- 3. Estado para el modal de la lista de canciones ---
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Cargar playlists desde localStorage al montar
  useEffect(() => {
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]");
    setPlaylists(savedPlaylists);
  }, []);

  // Función para guardar una nueva playlist
  const handleSavePlaylist = (name) => {
    const newPlaylist = {
      id: `playlist_${new Date().getTime()}`,
      name: name,
      tracks: [],
    };

    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    setShowCreateModal(false);
  };

  // --- 4. Lógica para eliminar una canción de una playlist ---
  const handleRemoveTrackFromPlaylist = (trackId) => {
    if (!selectedPlaylist) return;

    // Actualizar la lista de playlists
    const updatedPlaylists = playlists.map((p) => {
      if (p.id === selectedPlaylist.id) {
        // Filtramos la canción eliminada
        const newTracks = p.tracks.filter((t) => t.id !== trackId);
        return { ...p, tracks: newTracks };
      }
      return p;
    });

    // Actualizar el estado y el localStorage
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));

    // Actualizar el modal en vivo
    setSelectedPlaylist((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((t) => t.id !== trackId),
    }));
  };

  return (
    <div className="p-6 bg-transparent min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Mis Playlists</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={18} className="mr-2" />
          Crear Playlist
        </Button>
      </div>

      {/* Grid de Playlists */}
      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              // --- 5. Pasamos la función para abrir el modal ---
              onClick={() => setSelectedPlaylist(playlist)}
            />
          ))}
        </div>
      ) : (
        // Estado vacío (sin cambios)
        <div className="text-center py-20 bg-black/10 rounded-lg">
          <div className="w-16 h-16 bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No tienes playlists</h2>
          <p className="text-gray-300 dark:text-gray-400 mb-6">
            Crea tu primera playlist para guardar tus canciones favoritas.
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={18} className="mr-2" />
            Crear primera playlist
          </Button>
        </div>
      )}

      {/* Modal de Creación */}
      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSavePlaylist}
        />
      )}

      {/* --- 6. Renderizamos el modal de la lista de canciones --- */}
      {selectedPlaylist && (
        <SongListModal
          isOpen={true}
          onClose={() => setSelectedPlaylist(null)}
          title={selectedPlaylist.name}
          tracks={selectedPlaylist.tracks}
          onRemoveTrack={handleRemoveTrackFromPlaylist}
        />
      )}
    </div>
  );
}

export default Playlists;
