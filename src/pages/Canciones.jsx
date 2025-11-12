import { useState, useEffect } from "react";
import { getPopularTracks, getPopularAlbums } from "../services/deezerApi";
import TrackCardSmalll from "../components/cards/TrackCardSmalll";
import HomeSection from "../components/common/HomeSection";
import AlbumCardHome from "../components/cards/AlbumCardHome";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
      <p className="text-gray-400">Cargando...</p>
    </div>
  </div>
);

function Canciones() {
  const [popularTracks, setPopularTracks] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Cargamos ambas listas en paralelo
        const [tracksData, albumsData] = await Promise.all([
          getPopularTracks(), //
          getPopularAlbums(), //
        ]);

        setPopularTracks(tracksData);
        setPopularAlbums(albumsData);
      } catch (error) {
        console.error("Error al cargar datos populares:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 bg-transparent min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8 px-2 sm:px-0">Lo más escuchado</h1>

      {/* Carrusel de Canciones Populares */}
      <HomeSection title="Canciones mas escuchadas">
        {popularTracks.map((track) => (
          <TrackCardSmalll key={track.id} track={track} /> //
        ))}
      </HomeSection>

      {/* Carrusel de Álbumes Populares */}
      <HomeSection title="Álbumes mas escuchados">
        {popularAlbums.map((album) => (
          // Aquí usamos la tarjeta de Álbum que mencionaste
          <AlbumCardHome key={album.id} album={album} />
        ))}
      </HomeSection>
    </div>
  );
}

export default Canciones;
