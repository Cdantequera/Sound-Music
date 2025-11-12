import { useState, useEffect } from "react";
import { toggleFavorite, isFavorite as checkIsFavorite } from "../../utils/favoritos";
import { HeartPlus, HeartMinus, CirclePlus } from "lucide-react";

export default function TrackCard({ track, onAddToPlaylist }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(checkIsFavorite(track.id));
  }, [track.id]);

  const handleToggleFavorite = () => {
    toggleFavorite(track.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex items-center  bg-black/70 rounded-lg shadow-md hover:shadow-lg transition-shadow p-2 mb-4 border border-gray-700 ">
      <img
        src={track.album?.images?.[0]?.url || track.cover || "https://via.placeholder.com/80"}
        alt={track.name || track.title}
        className="w-15 h-15 rounded-lg mr-4 object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/80x80/f0f0f0/999999?text=♪";
        }}
      />
      <div className="grow">
        <h3 className="font-bold text-gray-900">{track.name || track.title}</h3>
        <p className="text-sm text-gray-600">
          {track.artists?.map((a) => a.name).join(", ") || track.artist || "Artista desconocido"}
        </p>
        {track.album?.name && <p className="text-xs text-gray-500 mt-1">{track.album.name}</p>}
      </div>
      <div className="flex gap-3 items-center">
        <button
          className={`text-2xl transition-all duration-200 hover:scale-110 ${
            isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          onClick={handleToggleFavorite}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? <HeartMinus /> : <HeartPlus />}
        </button>
        <button
          className="text-blue-500 hover:text-blue-700 text-xl transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-blue-50"
          onClick={() => onAddToPlaylist && onAddToPlaylist(track.id)}
          title="Agregar a playlist"
        >
          <CirclePlus />
        </button>
        {track.preview && (
          <button
            className="text-green-500 hover:text-green-700 text-xl transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-green-50"
            onClick={() => window.open(track.preview, "_blank")}
            title="Escuchar preview"
          >
            ▶️
          </button>
        )}
      </div>
    </div>
  );
}
