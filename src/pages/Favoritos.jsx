import { useState, useEffect } from "react";
import { HeartCrack, Play, Pause, XCircle } from "lucide-react";
import { getFavorites, toggleFavorite } from "../utils/favoritos";
import { getTrackById } from "../services/deezerApi";
import { usePlayer } from "../hook/usePlayer";
import Swal from "sweetalert2";

function Favoritos() {
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const favoriteIds = getFavorites();
        if (favoriteIds.length === 0) {
          setFavoriteTracks([]);
          setIsLoading(false);
          return;
        }
        const trackPromises = favoriteIds.map((id) => getTrackById(id));
        const tracksData = await Promise.all(trackPromises);
        const validTracks = tracksData.filter((track) => track && track.id);
        setFavoriteTracks(validTracks);
      } catch (error) {
        console.error("Error al cargar los favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const handlePlayTrack = (track) => {
    playTrack(track);
  };

  const handlePlayButtonClick = (e, track) => {
    e.stopPropagation();
    handlePlayTrack(track);
  };

  const handlePromptRemove = (e, track) => {
    e.stopPropagation(); // Evita que la fila se reproduzca

    // Detectamos si el modo oscuro de tu app está activo
    const isDarkMode = document.documentElement.classList.contains("dark");

    Swal.fire({
      title: "Quitar de Favoritos",
      text: `¿Estás seguro de que quieres quitar "${track.name}"?`,
      icon: "warning",
      showCancelButton: true,

      // Colores de los botones (puedes personalizarlos)
      confirmButtonColor: "#E11D48", // Rojo
      cancelButtonColor: isDarkMode ? "#4B5563" : "#6B7280", // Gris

      confirmButtonText: "Sí, quitar",
      cancelButtonText: "Cancelar",

      // Estilos para modo oscuro (para que coincida con tu app)
      background: isDarkMode ? "#1F2937" : "#FFFFFF", // Fondo (Gris oscuro o blanco)
      color: isDarkMode ? "#F9FAFB" : "#111827", // Texto (Casi blanco o casi negro)
    }).then((result) => {
      // Esto se ejecuta DESPUÉS de que el usuario elige
      if (result.isConfirmed) {
        // 1. Llama a la utilidad para actualizar el localStorage
        toggleFavorite(track.id);

        // 2. Actualiza el estado local para quitar la canción de la lista
        setFavoriteTracks((prevTracks) => prevTracks.filter((t) => t.id !== track.id));

        // (Opcional) Pequeña notificación de éxito
        Swal.fire({
          title: "¡Eliminado!",
          text: `"${track.name}" fue quitado de tus favoritos.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: isDarkMode ? "#1F2937" : "#FFFFFF",
          color: isDarkMode ? "#F9FAFB" : "#111827",
          timerProgressBar: true,
        });
      }
    });
  };

  const renderTrackRow = (track, index) => {
    const isThisTrackLoaded = currentTrack?.id === track.id;
    const isPlayingThisTrack = isThisTrackLoaded && isPlaying;

    return (
      <div
        key={track.id}
        className={`group flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 
                        ${isThisTrackLoaded ? "bg-pink-900/40 hover:bg-pink-900/50" : "hover:bg-black/20"}`}
        onClick={() => handlePlayTrack(track)}
      >
        <div className="w-6 text-center text-gray-400 font-semibold mr-4">
          {isThisTrackLoaded ? <span className="text-pink-400">♪</span> : index + 1}
        </div>

        <div className="flex items-center grow min-w-0">
          <div className="relative w-12 h-12 rounded-md mr-4 shrink-0 shadow-lg">
            <img
              src={track.album.images[2]?.url || track.album.images[0]?.url}
              alt={track.name}
              className="w-12 h-12 rounded-md object-cover transition-opacity group-hover:opacity-60"
            />
            <button
              className={`absolute inset-0 m-auto w-8 h-8 flex items-center justify-center 
                                    rounded-full bg-pink-600 text-white shadow-lg transition-all duration-300
                                    opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100`}
              onClick={(e) => handlePlayButtonClick(e, track)}
              title={isPlayingThisTrack ? "Pausar" : "Reproducir"}
            >
              {isPlayingThisTrack ? (
                <Pause size={16} fill="white" />
              ) : (
                <Play size={16} fill="white" className="ml-0.5" />
              )}
            </button>
          </div>

          <div className="min-w-0">
            <p
              className={`font-medium truncate ${isThisTrackLoaded ? "text-pink-400" : "text-white"}`}
            >
              {track.name}
            </p>
            <p className="text-sm text-gray-400 truncate">
              {track.artists[0]?.name || "Artista Desconocido"}
            </p>
          </div>
        </div>

        <p className="hidden md:block text-sm text-gray-400 truncate w-1/4">
          {track.album.name || "Álbum Desconocido"}
        </p>

        {/* El botón ahora llama a la función de SweetAlert */}
        <button
          onClick={(e) => handlePromptRemove(e, track)}
          className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-black/20 transition-colors"
          title="Quitar"
        >
          <XCircle size={18} />
        </button>

        <span className="text-sm text-gray-400 font-semibold w-12 text-right">
          {track.duration
            ? `${Math.floor(track.duration / 60)}:${("0" + Math.floor(track.duration % 60)).slice(-2)}`
            : "N/A"}
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-pink-500">Tus Favoritos ❤️</h1>
        <p className="text-gray-400">Cargando tus canciones favoritas...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mt-10"></div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 min-h-screen bg-linear-to-br from-gray-900 to-black/70">
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">
        Tus Favoritos
      </h1>

      {favoriteTracks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-800/50 rounded-xl border border-pink-700/30">
          <HeartCrack size={48} className="text-pink-500 mb-4" />
          <p className="text-xl font-medium text-gray-300">Aún no tienes canciones favoritas.</p>
          <p className="text-sm text-gray-500 mt-2">¡Busca tu música y haz clic en el corazón!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center p-3 text-gray-500 text-xs uppercase font-semibold border-b border-gray-700/50 mb-4">
            <div className="w-6 mr-4">#</div>
            <div className="grow">Título</div>
            <div className="hidden md:block w-1/4">Álbum</div>
            <div className="w-10"></div>
            <div className="w-12 text-right">Tiempo</div>
          </div>

          {favoriteTracks.map(renderTrackRow)}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
