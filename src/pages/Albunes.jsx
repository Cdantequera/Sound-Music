import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularAlbums } from "../services/deezerApi";
import AlbumCard from "../components/cards/AlbumCards";

function Albunes() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      const albumData = await getPopularAlbums();
      setAlbums(albumData);
      setIsLoading(false);
    };
    fetchAlbums();
  }, []);

  // Navega a la página de detalle del álbum
  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Álbumes Populares</h1>

      {isLoading ? (
        <p className="text-gray-400">Cargando álbumes...</p>
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

export default Albunes;
