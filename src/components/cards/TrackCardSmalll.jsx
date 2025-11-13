import { useState, useEffect } from "react";
import { usePlayer } from "../../hook/usePlayer";
import { toggleFavorite, isFavorite as checkIsFavorite } from "../../utils/favoritos";
import { Play, Pause, Heart } from "lucide-react";

function TrackCardSmalll({ track }) {
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const [isFavorite, setIsFavorite] = useState(false);
  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;
  const imageUrl = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url || "";

  useEffect(() => {
    setIsFavorite(checkIsFavorite(track.id));
  }, [track.id]);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(track.id);
    setIsFavorite((prev) => !prev);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    playTrack(track);
  };

  if (!track || !track.album || !track.artists) {
    console.warn("TrackCardSmalll: Se omitió un track por datos incompletos", track);
    return null;
  }

  return (
    <div
      className={`shrink-0 w-48 h-auto flex flex-col justify-start rounded-lg 
             cursor-pointer transition-all duration-300 group p-3 
             hover:bg-black/20 
             ${isCurrentTrack ? "" : ""}`}
      onClick={() => playTrack(track)}
      title={`${track.name} - ${track.artists[0].name}`}
    >
      {/* IMAGEN Y BOTÓN DE REPRODUCIR SUPERPUESTO */}
      <div className="relative w-full aspect-square mb-3">
        <img
          src={imageUrl}
          alt={track.album.name}
          className="w-full h-full rounded-md object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/270x270/f0f0f0/999999?text=♪";
          }}
        />

        {isCurrentlyPlaying && (
          <span className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        )}

        {/* Botón de Reproducir/Pausar - Superpuesto y Centrado */}
        <button
          className={`absolute inset-0 m-auto w-12 h-12 flex items-center justify-center 
                      rounded-full bg-pink-600 text-white shadow-lg transition-all duration-300
                      ${isCurrentTrack || isCurrentlyPlaying ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}`}
          onClick={handlePlay}
          title={isCurrentlyPlaying ? "Pausar" : "Reproducir"}
        >
          {isCurrentlyPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
        </button>
      </div>

      {/* INFORMACIÓN DEL TRACK (Nombre, Artista y Botón de Favorito) */}
      <div className="flex flex-col text-left">
        <p className="font-semibold text-white truncate text-base mb-1 leading-tight">
          {track.name}
        </p>

        {/* Contenedor para alinear Artista a la izquierda y Corazón a la derecha */}
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm text-gray-400 truncate leading-tight">{track.artists[0].name}</p>

          <button
            onClick={handleToggleFavorite}
            className={`text-gray-400 hover:text-pink-500 transition-colors shrink-0 ${
              isFavorite ? "text-pink-600" : ""
            }`}
            title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {isFavorite ? <Heart size={18} fill="currentColor" /> : <Heart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrackCardSmalll;
