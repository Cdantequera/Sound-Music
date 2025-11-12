import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAlbumsByGenre, getGenreById } from "../services/deezerApi";
import AlbumCard from "../components/common/AlbumCard";

function GeneroDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genreName, setGenreName] = useState("Género");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [genreInfo, albumData] = await Promise.all([getGenreById(id), getAlbumsByGenre(id)]);

        if (genreInfo) {
          setGenreName(genreInfo.name);
        }
        setAlbums(albumData);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setError("Error al cargar los álbumes. Intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
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

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Álbumes de {genreName}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          <p className="ml-4 text-gray-400">Cargando álbumes...</p>
        </div>
      ) : albums.length === 0 && !error ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-400">No se encontraron álbumes para este género.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <li key={album.id}>
              <AlbumCard album={album} onClick={handleAlbumClick} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GeneroDetail;
