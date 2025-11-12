import { Play, Pause } from "lucide-react"; // Importamos los iconos de Lucide

function SongCard({ track, onPlay, isPlaying }) {
  if (!track || !track.album || !track.artists || track.artists.length === 0) {
    return null;
  }

  const imageUrl = track.album.images[2]?.url || track.album.images[1]?.url || "";
  const title = track.name;
  const artistName = track.artists[0].name;

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(track);
    }
  };

  const handlePlayButtonClick = (e) => {
    e.stopPropagation();
    handlePlayClick();
  };

  return (
    <div
      onClick={handlePlayClick}
      className="group relative flex items-center p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer transition-colors duration-200"
    >
      {/* Contenedor de la imagen y el botón de play */}
      <div className="relative w-12 h-12 rounded-md object-cover mr-4 shrink-0">
        <img
          src={imageUrl}
          alt={`Carátula de ${title}`}
          // Aplicamos el 'group-hover' para oscurecer la imagen
          className="w-12 h-12 rounded-md object-cover transition-opacity group-hover:opacity-60"
        />

        {/* Botón de Play/Pausa (Estilo de TrackCardSmalll) */}
        {/* Visible solo en 'group-hover' y centrado */}
        <button
          className={`absolute inset-0 m-auto w-8 h-8 flex items-center justify-center 
                      rounded-full bg-pink-600 text-white shadow-lg transition-all duration-300
                      // El botón solo aparece al hacer hover
                      opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100`}
          onClick={handlePlayButtonClick}
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          {/* Usamos el icono de Play o Pausa basado en 'isPlaying' */}
          {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
        </button>
      </div>

      {/* Información de la canción */}
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{artistName}</p>
      </div>

      {/* Indicador de reproducción 'animate-ping' (Estilo de TrackCardSmalll) */}
      {isPlaying && (
        <span className="absolute top-2 right-2 flex h-3 w-3" title="Reproduciendo">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      )}
    </div>
  );
}

export default SongCard;
