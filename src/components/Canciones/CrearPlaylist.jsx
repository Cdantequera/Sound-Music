import { useState } from "react";
import { savePlaylist } from "../../utils/favoritos";

export default function CrearPlaylist({ visible, onClose, allTracks }) {
  const [name, setName] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);

  const toggleTrackSelection = (trackId) => {
    if (selectedTracks.includes(trackId)) {
      setSelectedTracks(selectedTracks.filter((id) => id !== trackId));
    } else {
      setSelectedTracks([...selectedTracks, trackId]);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("El nombre de la playlist es requerido");
      return;
    }
    if (selectedTracks.length === 0) {
      alert("Selecciona al menos una canción");
      return;
    }

    savePlaylist(name.trim(), selectedTracks);
    setName("");
    setSelectedTracks([]);
    onClose();
    alert(`Playlist "${name}" creada exitosamente!`);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-linear-to-br from-purple-900 via-blue-900 to-purple-500 p-6 rounded-lg shadow-lg z-50 w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4"> Crear Nueva Playlist</h2>

        {/* Nombre de la playlist */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Nombre de la Playlist
          </label>
          <input
            type="text"
            placeholder="Ej: Mi música favorita"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Selección de canciones */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Canciones ({selectedTracks.length} seleccionadas)
          </label>
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
            {allTracks &&
              allTracks.map((track) => (
                <div
                  key={track.id}
                  className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                    selectedTracks.includes(track.id) ? "bg-blue-50" : ""
                  }`}
                  onClick={() => toggleTrackSelection(track.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedTracks.includes(track.id)}
                    onChange={() => toggleTrackSelection(track.id)}
                    className="mr-3"
                  />
                  <img
                    src={
                      track.album?.images?.[2]?.url ||
                      track.cover ||
                      "https://via.placeholder.com/40"
                    }
                    alt={track.name}
                    className="w-10 h-10 rounded mr-3"
                  />
                  <div className="grow">
                    <p className="font-medium text-sm">{track.name}</p>
                    <p className="text-xs text-gray-600">
                      {track.artists?.map((a) => a.name).join(", ") ||
                        track.artist ||
                        "Artista desconocido"}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={handleSave}
          >
            Crear Playlist
          </button>
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
