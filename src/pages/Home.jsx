import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPopularTracks,
  getPopularAlbums,
  getGenres,
  getTrackById,
  getAlbumById,
} from "../services/deezerApi";
import { useSearch } from "../hook/useAuth";
import HomeSection from "../components/common/HomeSection";
import GenreCard from "../components/common/GenreCard";
import AlbumCardHome from "../components/cards/AlbumCardHome";
import TrackCardSmalll from "../components/cards/TrackCardSmalll";

const CUSTOM_ALBUM_IDS = ["50067392", "645800", "1223703", "263058382", "382011"];

// IDs personalizados para las canciones
const CUSTOM_TRACK_IDS = [
  "3448441",
  "7393403",
  "676836",
  "859699",
  "4254177",
  "1153386",
  "125151376",
  "15356340",
];

const fetchItemsByIds = async (ids, fetchFunction) => {
  const promises = ids.map((id) => fetchFunction(id));
  const results = await Promise.all(promises);
  return results.filter((item) => item !== null);
};

// --- FUNCIÓN mixRecents CORREGIDA Y MEJORADA ---
const mixRecents = (albums, tracks) => {
  // Aseguramos que cada ítem tenga una propiedad 'type' para el renderizado condicional
  const albumItems = albums.map((item) => ({ ...item, type: "album" }));
  const trackItems = tracks.map((item) => ({ ...item, type: "track" }));

  const mixed = [];
  let trackIndex = 0;

  // Intercalamos 1 Álbum y luego 2 Canciones
  for (let i = 0; i < albumItems.length; i++) {
    // 1. Añadir Álbum
    mixed.push(albumItems[i]);

    // 2. Añadir Canción 1
    if (trackIndex < trackItems.length) {
      mixed.push(trackItems[trackIndex]);
      trackIndex++;
    }

    // 3. Añadir Canción 2
    if (trackIndex < trackItems.length) {
      mixed.push(trackItems[trackIndex]);
      trackIndex++;
    }
  }

  // 4. Añadir cualquier canción restante si quedan más de las que se intercalaron
  while (trackIndex < trackItems.length) {
    mixed.push(trackItems[trackIndex]);
    trackIndex++;
  }

  // Nota: El track con ID vacío ("") se filtra previamente en fetchItemsByIds.
  return mixed.filter(Boolean);
};

function Home() {
  const { searchResults, isLoading, hasSearched } = useSearch();
  // Estados para datos populares (Populares del momento, Géneros, Álbumes Populares)
  const [popularTracks, setPopularTracks] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  // ÚNICO ESTADO para la lista mezclada de "Vuelve a escucharlo"
  const [customRecents, setCustomRecents] = useState([]);

  const [isLoadingData, setIsLoadingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasSearched) {
      const loadHomeData = async () => {
        setIsLoadingData(true);
        try {
          // 1. Carga de datos populares y obtención de IDs personalizados en paralelo
          const [tracksData, albumsData, genresData, customAlbumsData, customTracksData] =
            await Promise.all([
              getPopularTracks(),
              getPopularAlbums(),
              getGenres(),
              // Filtrar IDs vacíos ANTES de llamar a la API
              fetchItemsByIds(
                CUSTOM_ALBUM_IDS.filter((id) => id),
                getAlbumById
              ),
              fetchItemsByIds(
                CUSTOM_TRACK_IDS.filter((id) => id),
                getTrackById
              ),
            ]);

          // 2. Establecer estados populares
          setPopularTracks(tracksData);
          setPopularAlbums(albumsData);
          setGenres(genresData);

          // 3. Mezclar y establecer el estado de los recientes personalizados
          setCustomRecents(mixRecents(customAlbumsData, customTracksData));
        } catch (error) {
          console.error("Error al cargar datos del Home:", error);
        } finally {
          setIsLoadingData(false);
        }
      };

      loadHomeData();
    }
  }, [hasSearched]);

  // Función para renderizar la tarjeta correcta
  const renderRecentItem = (item) => {
    if (item.type === "album") {
      return <AlbumCardHome key={`album-${item.id}`} album={item} />;
    }
    if (item.type === "track") {
      return <TrackCardSmalll key={`track-${item.id}`} track={item} />;
    }
    return null;
  };

  const renderTrackList = (tracks) => (
    <div className="flex gap-4 p-2 overflow-x-auto scrollbar-hide">
      {tracks.map((track) => (
        <TrackCardSmalll key={track.id} track={track} />
      ))}
    </div>
  );

  return (
    <div className="pt-4 sm:pt-6">
      {/* --- SECCIÓN DE BÚSQUEDA --- */}
      {isLoading && <p className="text-gray-600 dark:text-gray-400 px-4 sm:px-6">Buscando...</p>}

      {!isLoading && hasSearched && (
        <div className="px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Resultados de la búsqueda
          </h2>
          {renderTrackList(searchResults)}
        </div>
      )}

      {/* --- SECCIONES PRINCIPALES DEL HOME --- */}
      {!hasSearched && (
        <div>
          {isLoadingData ? (
            <p className="text-gray-600 dark:text-gray-400 px-4 sm:px-6">Cargando...</p>
          ) : (
            <div>
              {/* Carrusel de Géneros - ORIGINAL: USA datos populares */}
              <HomeSection title="Explorar Géneros" href="/generos">
                {genres.map((genre) => (
                  <GenreCard key={genre.id} genre={genre} onClick={() => navigate("/generos")} />
                ))}
              </HomeSection>

              {/* === ÚNICA SECCIÓN: VUELVE A ESCUCHARLO (MEZCLADO) === */}
              {customRecents.length > 0 && (
                <HomeSection title="Vuelve a Escucharlo">
                  {customRecents.map(renderRecentItem)}
                </HomeSection>
              )}

              {/* Carrusel de Populares del momento - ORIGINAL: USA datos populares */}
              <HomeSection title="Populares del momento">
                {popularTracks.map((track) => (
                  <TrackCardSmalll key={track.id} track={track} />
                ))}
              </HomeSection>

              {/* Carrusel de Álbumes Populares - ORIGINAL: USA datos populares */}
              <HomeSection title="Álbumes Populares" href="/albunes">
                {popularAlbums.map((album) => (
                  <AlbumCardHome key={album.id} album={album} />
                ))}
              </HomeSection>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
