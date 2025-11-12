const DEEZER_API = "https://api.deezer.com";
const CORS_PROXY = "https://api.codetabs.com/v1/proxy?quest=";

const _transformTrackData = (track) => {
  if (!track) {
    console.warn("Track es null o undefined");
    return null;
  }

  if (!track.album || typeof track.album !== "object") {
    console.warn("Track inválido - sin álbum:", track);
    return null;
  }

  if (!track.artist || typeof track.artist !== "object") {
    console.warn("Track inválido - sin artista:", track);
    return null;
  }

  // Asegurarnos de que tenemos al menos los datos mínimos
  try {
    const transformedTrack = {
      id: track.id?.toString() || "",
      name: track.title || "Título desconocido",
      artistId: track.artist?.id?.toString() || "",
      artists: [{ name: track.artist?.name || "Artista desconocido" }],
      album: {
        name: track.album?.title || "Álbum desconocido",
        images: [
          { url: track.album.cover_xl || track.album.cover_big || track.album.cover_medium || "" },
          { url: track.album.cover_big || track.album.cover_medium || "" },
          { url: track.album.cover_medium || "" },
        ].filter((img) => img.url), // Filtra imágenes vacías
      },
      preview_url: track.preview || "",
      external_url: track.link || "",
    };

    // Verificar que tenemos al menos los datos esenciales
    if (!transformedTrack.id || !transformedTrack.preview_url) {
      console.warn("Track sin ID o preview, se omite:", track);
      return null;
    }

    return transformedTrack;
  } catch (error) {
    console.error("Error transformando track:", error, track);
    return null;
  }
};

const _transformGenreData = (genre) => {
  if (!genre) return null;
  return {
    id: genre.id.toString(),
    name: genre.name,
    // Usamos 'picture_medium' para los géneros
    image: genre.picture_medium || genre.picture_big || genre.picture,
  };
};

const _transformAlbumData = (album) => {
  if (!album || !album.artist) return null;
  return {
    id: album.id.toString(),
    name: album.title,
    artistName: album.artist.name,
    image: album.cover_medium || album.cover_big || album.cover,
    artistId: album.artist.id.toString(),
  };
};

// Buscar música (Tu función original, ahora usa el helper)
export const searchMusic = async (query) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(
        `${DEEZER_API}/search?q=${encodeURIComponent(query)}&limit=20`
      )}`
    );
    const data = await response.json();
    console.log("Resultados de búsqueda:", data);

    if (!data.data) {
      return [];
    }

    // Usamos el helper para transformar
    return data.data.map(_transformTrackData).filter(Boolean); // .filter(Boolean) elimina nulos
  } catch (error) {
    console.error("Error al buscar:", error);
    return [];
  }
};

// Obtener canciones populares del chart (Tu función original, ahora usa el helper)
export const getPopularTracks = async () => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/chart/0/tracks?limit=20`)}`
    );
    const data = await response.json();
    console.log("Canciones populares:", data);

    if (!data.data) {
      return [];
    }

    // Usamos el helper para transformar
    return data.data.map(_transformTrackData).filter(Boolean);
  } catch (error) {
    console.error("Error al obtener populares:", error);
    return [];
  }
};

// Obtener los detalles de una canción por su ID
export const getTrackById = async (trackId) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/track/${trackId}`)}`
    );
    const data = await response.json(); // Viene el objeto track directo

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Usamos el helper para transformar el único track
    return _transformTrackData(data);
  } catch (error) {
    console.error(`Error al obtener track por ID (${trackId}):`, error);
    return null;
  }
};

// OBTENER LA CANCIÓN MÁS POPULAR DE UN ARTISTA (Función existente)
export const getArtistTopTrack = async (artistId) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/artist/${artistId}/top?limit=1`)}`
    );
    const data = await response.json(); // Viene { data: [track] }

    if (data.error) {
      throw new Error(data.error.message);
    }
    if (!data.data || data.data.length === 0) {
      return null; // Artista sin tracks
    }

    // Usamos el helper para transformar el primer track
    return _transformTrackData(data.data[0]);
  } catch (error) {
    console.error(`Error al obtener top track de artista (${artistId}):`, error);
    return null;
  }
};

// NUEVA FUNCIÓN: Obtener la lista de canciones populares de un artista
export const getArtistTopTracks = async (artistId, limit = 10) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/artist/${artistId}/top?limit=${limit}`)}`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }
    if (!data.data) {
      return [];
    }

    // Usamos el helper para transformar el array de tracks
    return data.data.map(_transformTrackData).filter(Boolean);
  } catch (error) {
    console.error(`Error al obtener top tracks de artista (${artistId}):`, error);
    return [];
  }
};

// Obtener Generos
export const getGenres = async () => {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/genre`)}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    // Devuelve { data: [genre1, genre2, ...] }
    return data.data ? data.data.map(_transformGenreData).filter(Boolean) : [];
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    return [];
  }
};

//Obtener Albunes populares

export const getPopularAlbums = async () => {
  try {
    // Llama al chart de álbumes
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/chart/0/albums?limit=20`)}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    // Devuelve { data: [album1, album2, ...] }
    return data.data ? data.data.map(_transformAlbumData).filter(Boolean) : [];
  } catch (error) {
    console.error("Error al obtener álbumes populares:", error);
    return [];
  }
};

// Obtener la radio principal
export const getTopRadioTracks = async () => {
  try {
    // 1. Primero, obtenemos la radio más popular (limit=1)
    const radioResponse = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/chart/0/radios?limit=1`)}`
    );
    const radioData = await radioResponse.json();

    if (radioData.error || !radioData.data || radioData.data.length === 0) {
      throw new Error("No se pudo obtener la radio principal");
    }

    const topRadio = radioData.data[0];

    // 2. Segundo, obtenemos el 'tracklist' de ESA radio
    const tracksResponse = await fetch(`${CORS_PROXY}${encodeURIComponent(topRadio.tracklist)}`);
    const tracksData = await tracksResponse.json();

    if (tracksData.error) {
      throw new Error("No se pudo obtener el tracklist de la radio");
    }

    // 3. Transformamos los datos de las canciones
    // Asumo que ya tienes la función _transformTrackData
    return tracksData.data ? tracksData.data.map(_transformTrackData).filter(Boolean) : [];
  } catch (error) {
    console.error("Error al obtener éxitos de radio:", error);
    return []; // Devuelve un array vacío si falla
  }
};

export const getAlbumsByGenre = async (genreId) => {
  try {
    // Usamos el endpoint de búsqueda con el filtro por género
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(
        `${DEEZER_API}/search/album?q=genre:"${genreId}"&limit=20`
      )}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return data.data ? data.data.map(_transformAlbumData).filter(Boolean) : [];
  } catch (error) {
    console.error(`Error al obtener álbumes del género ${genreId}:`, error);
    return [];
  }
};

export const getGenreById = async (genreId) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/genre/${genreId}`)}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return _transformGenreData(data);
  } catch (error) {
    console.error(`Error al obtener género ${genreId}:`, error);
    return null;
  }
};

export const getAlbumTracks = async (albumId) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/album/${albumId}/tracks`)}`
    );
    const data = await response.json();

    if (data.error) {
      console.error(`Error API Deezer: ${data.error.message}`);
      throw new Error(data.error.message);
    }

    if (!data.data || !Array.isArray(data.data)) {
      console.warn("Estructura de datos inesperada:", data);
      return [];
    }

    // Transformar y filtrar tracks válidos
    const validTracks = data.data.map(_transformTrackData).filter((track) => {
      // Filtra tracks que no tengan preview (no se pueden reproducir)
      const hasPreview = track && track.preview_url;
      if (!hasPreview) {
        console.warn("Track sin preview, se omite:", track);
      }
      return hasPreview;
    });

    console.log(`✅ ${validTracks.length} tracks válidos de ${data.data.length} totales`);
    return validTracks;
  } catch (error) {
    console.error(`Error al obtener pistas del álbum ${albumId}:`, error);
    return [];
  }
};

// Obtener información del álbum por ID
export const getAlbumById = async (albumId) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/album/${albumId}`)}`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return _transformAlbumData(data);
  } catch (error) {
    console.error(`Error al obtener álbum ${albumId}:`, error);
    return null;
  }
};

// ALTERNATIVA: Obtener tracks del álbum con mejor manejo de errores
export const getAlbumTracksRobust = async (albumId) => {
  try {
    // Primero obtener info del álbum para tener contexto
    const albumInfo = await getAlbumById(albumId);
    if (!albumInfo) {
      throw new Error(`No se pudo obtener información del álbum ${albumId}`);
    }

    // Luego obtener las pistas
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/album/${albumId}/tracks`)}`
    );
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    if (!data.data || data.data.length === 0) {
      console.warn(`Álbum ${albumId} no tiene pistas disponibles`);
      return [];
    }

    // Transformar tracks con información adicional del álbum
    const tracksWithAlbumContext = data.data
      .map((track) => {
        try {
          // Si el track no tiene album info completa, la completamos con la del álbum
          if (!track.album || !track.album.title) {
            track.album = {
              ...track.album,
              title: albumInfo.name,
              cover_xl: albumInfo.image,
              cover_big: albumInfo.image,
              cover_medium: albumInfo.image,
            };
          }

          // Si el track no tiene artista, usar el del álbum
          if (!track.artist || !track.artist.name) {
            track.artist = {
              ...track.artist,
              name: albumInfo.artistName,
              id: albumInfo.artistId,
            };
          }

          return _transformTrackData(track);
        } catch (trackError) {
          console.warn("Error procesando track individual:", trackError, track);
          return null;
        }
      })
      .filter(Boolean);

    return tracksWithAlbumContext;
  } catch (error) {
    console.error(`Error robusto al obtener pistas del álbum ${albumId}:`, error);
    return [];
  }
};
