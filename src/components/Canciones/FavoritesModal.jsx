import { useState, useEffect } from "react";
import { getFavorites, toggleFavorite } from "../../utils/favoritos";
import { Trash2 } from "lucide-react";

export default function FavoritesModal({ visible, onClose, tracks }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (visible) {
      setFavorites(getFavorites());
    }
  }, [visible]);

  if (!visible) return null;

  const favoriteTracks = tracks.filter((track) => favorites.includes(track.id));

  const handleToggleFavorite = (trackId) => {
    const newFavorites = toggleFavorite(trackId);
    setFavorites(newFavorites);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/90 bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-linear-to-br from-purple-900 via-blue-900 to-purple-500 p-6 rounded-lg shadow-lg z-50 w-96 max-h-[80vh] overflow-y-auto">
        <div className="text-xl font-bold mb-4 text-gray-950 ">❤️ Tus Favoritos</div>
        {favoriteTracks.length === 0 ? (
          <p className="text-gray-500">No hay canciones favoritas aún.</p>
        ) : (
          favoriteTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center mb-4 border-2 border-gray-600 rounded-xl p-2 bg-black/70"
            >
              <img
                src={track.album.images[2].url}
                alt={track.name}
                className="w-12 h-12 rounded mr-3"
              />
              <div className="grow ">
                <p className="font-semibold">{track.name}</p>
                <p className="text-sm text-gray-600">
                  {track.artists.map((a) => a.name).join(", ")}
                </p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded transition-colors"
                onClick={() => handleToggleFavorite(track.id)}
              >
                <Trash2 />
              </button>
            </div>
          ))
        )}
        <button className="mt-4 text-blue-500" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </>
  );
}
