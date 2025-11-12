// src/pages/AlbumDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAlbumById, getAlbumTracksRobust } from "../services/deezerApi";
import { usePlayer } from "../hook/usePlayer";
import SongCard from "../components/common/SongCard";

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const [tracks, setTracks] = useState([]);
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Obtener información del álbum y sus pistas
        const [albumData, tracksData] = await Promise.all([
          getAlbumById(id),
          getAlbumTracksRobust(id),
        ]);

        setAlbum(albumData);
        setTracks(tracksData);

        if (tracksData.length === 0) {
          setError("No se encontraron pistas en este álbum.");
        }
      } catch (error) {
        console.error("Error cargando datos del álbum:", error);
        setError("Error al cargar el álbum. Intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  const handlePlay = (track) => {
    playTrack(track);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 sm:p-6">
      <button
        onClick={handleBackClick}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Volver atrás
      </button>

      {album && (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <img src={album.image} alt={album.name} className="w-48 h-48 rounded-lg shadow-lg" />
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{album.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{album.artistName}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{tracks.length} pistas</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          <p className="ml-4 text-gray-400">Cargando álbum...</p>
        </div>
      ) : tracks.length === 0 && !error ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-400">No se encontraron pistas en este álbum.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Pistas del álbum
          </h2>
          <ul className="grid grid-cols-1 gap-4">
            {tracks.map((track) => (
              <li key={track.id}>
                <SongCard track={track} onPlay={handlePlay} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlbumDetail;
