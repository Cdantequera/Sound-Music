import {
  Play,
  Pause,
  ChevronDown,
  Volume2,
  Volume1,
  VolumeX,
  HeartPlus,
  HeartMinus,
  CirclePlus,
} from "lucide-react";
import { usePlayer } from "../../hook/usePlayer";
import { isFavorite, toggleFavorite } from "../../utils/favoritos";
import { useState, useEffect } from "react";
import { usePlaylist } from "../../hook/usePlaylist";

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    seekTo,
    isPlayerVisible,
    closePlayer,
    volume,
    setVolume,
  } = usePlayer();

  // --- 2. Llama al hook ---
  const { openPlaylistModal } = usePlaylist();

  // Estado local para manejar el icono de favorito
  const [isCurrentTrackFavorite, setIsCurrentTrackFavorite] = useState(false);

  // Sincronizar el estado de favorito cuando la canción cambia
  useEffect(() => {
    if (currentTrack?.id) {
      // Usamos la función de utilidad para chequear el estado actual
      setIsCurrentTrackFavorite(isFavorite(currentTrack.id));
    } else {
      setIsCurrentTrackFavorite(false);
    }
  }, [currentTrack?.id]);

  if (!isPlayerVisible || !currentTrack) {
    return null;
  }

  // --- LÓGICA DE MANEJADORES ---
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Evitar cualquier propagación indeseada
    if (currentTrack?.id) {
      // Usamos la función de utilidad para alternar el estado
      toggleFavorite(currentTrack.id);
      // Actualizamos el estado local
      setIsCurrentTrackFavorite((prev) => !prev);
    }
  };

  // --- 3. Modifica esta función ---
  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    // ¡Aquí está la magia!
    openPlaylistModal(currentTrack);
  };

  // Formatear el tiempo de segundos a "MM:SS"
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Componente que renderiza el icono de volumen (silenciado, bajo, alto)
  const VolumeIcon = ({ size, className }) => {
    let Icon;
    if (volume === 0) Icon = VolumeX;
    else if (volume < 50) Icon = Volume1;
    else Icon = Volume2;

    return <Icon size={size} className={className} />;
  };

  // Manejador del slider de volumen
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-700 p-3 sm:p-4 flex items-center justify-between text-white shadow-lg">
      {/* Sección Izquierda: Info + Botones de Acción */}
      <div className="flex items-center gap-3 w-1/3 min-w-[200px]">
        {currentTrack.album && currentTrack.album.images[2] && (
          <img
            src={currentTrack.album.images[2].url}
            alt={currentTrack.album.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
          />
        )}
        <div className="flex flex-col overflow-hidden">
          <p className="font-semibold text-sm truncate max-w-[120px]">{currentTrack.name}</p>
          <p className="text-xs text-gray-400 truncate max-w-[120px]">
            {currentTrack.artists[0]?.name || "Artista desconocido"}
          </p>
        </div>

        {/* NUEVOS BOTONES DE ACCIÓN */}
        <div className="flex items-center gap-2 ml-4">
          {/* 1. Botón Me Gusta/Favorito */}
          <button
            className={`transition-all duration-200 hover:scale-110 p-1 rounded-full 
                    ${
                      isCurrentTrackFavorite
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-500 hover:bg-neutral-800"
                    }`}
            onClick={handleToggleFavorite}
            title={isCurrentTrackFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-label="Alternar favorito"
          >
            {isCurrentTrackFavorite ? (
              <HeartMinus size={20} fill="currentColor" />
            ) : (
              <HeartPlus size={20} />
            )}
          </button>

          {/* 2. Botón Agregar a Playlist */}
          <button
            className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:scale-110 p-1 rounded-full hover:bg-neutral-800"
            onClick={handleAddToPlaylist}
            title="Agregar a playlist"
            aria-label="Agregar a playlist"
          >
            <CirclePlus size={20} />
          </button>
        </div>
      </div>

      {/* Sección Central: Controles de Reproducción y Progreso */}
      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="flex items-center gap-4 mb-1">
          <button
            onClick={togglePlayPause}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-all duration-300 transform hover:scale-110"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" />
            )}
          </button>
        </div>
        <div className="flex items-center w-full max-w-sm gap-2 text-xs text-gray-400">
          <span>{formatTime((progress / 100) * duration)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Sección Derecha: Slider de Volumen y Cerrar Reproductor  */}
      <div className="w-1a/3 flex justify-end items-center gap-4">
        {/* Slider de Volumen  */}
        <div className="flex items-center gap-2">
          <VolumeIcon size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Botón Cerrar Reproductor */}
        <button
          onClick={closePlayer}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-neutral-700"
          aria-label="Cerrar reproductor"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
