// ✅ URL base apuntando al rewrite de Vercel
const DEEZER_API = "/api/deezer"; 

// --- HELPERS DE TRANSFORMACIÓN ---

const _transformTrackData = (track) => {
  if (!track) {
    console.warn("Track es null o undefined");
    return null;
  }

  if (!track.album || typeof track.album !== "object") {
    // Intentamos recuperar info básica si falta el objeto álbum completo
    if (!track.album) track.album = { title: "Desconocido" };
  }

  if (!track.artist || typeof track.artist !== "object") {
    if (!track.artist) track.artist = { name: "Desconocido" };
  }

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
        ].filter((img) => img && img.url),
      },
      preview_url: track.preview || "",
      external_url: track.link || "",
    };

    if (!transformedTrack.id || !transformedTrack.preview_url) {
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

// --- FUNCIONES EXPORTADAS (SIN PROXY) ---

export const searchMusic = async (query) => {
  try {
    const response = await fetch(
      `${DEEZER_API}/search?q=${encodeURIComponent(query)}&limit=20`
    );
    const data = await response.json();

    if (!data.data) return [];
    return data.data.map(_transformTrackData).filter(Boolean);
  } catch (error) {
    console.error("Error al buscar:", error);
    return [];
  }
};

export const getPopularTracks = async () => {
  try {
    const response = await fetch(`${DEEZER_API}/chart/0/tracks?limit=20`);
    const data = await response.json();

    if (!data.data) return [];
    return data.data.map(_transformTrackData).filter(Boolean);
  } catch (error) {
    console.error("Error al obtener populares:", error);
    return [];
  }
};

export const getTrackById = async (trackId) => {
  try {
    const response = await fetch(`${DEEZER_API}/track/${trackId}`);
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);
    return _transformTrackData(data);
  } catch (error) {
    console.error(`Error al obtener track por ID (${trackId}):`, error);
    return null;
  }
};

export const getArtistTopTrack = async (artistId) => {
  try {
    const response = await fetch(`${DEEZER_API}/artist/${artistId}/top?limit=1`);
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);
    if (!data.data || data.data.length === 0) return null;

    return _transformTrackData(data.data[0]);
  } catch (error) {
    console.error(`Error al obtener top track de artista (${artistId}):`, error);
    return null;
  }
};

export const getArtistTopTracks = async (artistId, limit = 10) => {
  try {
    const response = await fetch(
      `${DEEZER_API}/artist/${artistId}/top?limit=${limit}`
    );
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);
    if (!data.data) return [];

    return data.data.map(_transformTrackData).filter(Boolean);
  } catch (error) {
    console.error(`Error al obtener top tracks de artista (${artistId}):`, error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(`${DEEZER_API}/genre`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return data.data ? data.data.map(_transformGenreData).filter(Boolean) : [];
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    return [];
  }
};

export const getPopularAlbums = async () => {
  try {
    const response = await fetch(`${DEEZER_API}/chart/0/albums?limit=20`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return data.data ? data.data.map(_transformAlbumData).filter(Boolean) : [];
  } catch (error) {
    console.error("Error al obtener álbumes populares:", error);
    return [];
  }
};

export const getTopRadioTracks = async () => {
  try {
    const radioResponse = await fetch(`${DEEZER_API}/chart/0/radios?limit=1`);
    const radioData = await radioResponse.json();

    if (radioData.error || !radioData.data || radioData.data.length === 0) {
      throw new Error("No se pudo obtener la radio principal");
    }

    const topRadio = radioData.data[0];
    
    // Reemplazamos el dominio original de Deezer por nuestro proxy local
    const tracklistUrl = topRadio.tracklist.replace('https://api.deezer.com', DEEZER_API);

    const tracksResponse = await fetch(tracklistUrl);
    const tracksData = await tracksResponse.json();

    return tracksData.data ? tracksData.data.map(_transformTrackData).filter(Boolean) : [];
  } catch (error) {
    console.error("Error al obtener éxitos de radio:", error);
    return [];
  }
};

export const getAlbumsByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${DEEZER_API}/search/album?q=genre:"${genreId}"&limit=20`
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
    const response = await fetch(`${DEEZER_API}/genre/${genreId}`);
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
    const response = await fetch(`${DEEZER_API}/album/${albumId}/tracks`);
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);
    if (!data.data || !Array.isArray(data.data)) return [];

    return data.data.map(_transformTrackData).filter((track) => track && track.preview_url);
  } catch (error) {
    console.error(`Error al obtener pistas del álbum ${albumId}:`, error);
    return [];
  }
};

export const getAlbumById = async (albumId) => {
  try {
    const response = await fetch(`${DEEZER_API}/album/${albumId}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return _transformAlbumData(data);
  } catch (error) {
    console.error(`Error al obtener álbum ${albumId}:`, error);
    return null;
  }
};

export const getAlbumTracksRobust = async (albumId) => {
  try {
    const albumInfo = await getAlbumById(albumId);
    if (!albumInfo) {
      throw new Error(`No se pudo obtener información del álbum ${albumId}`);
    }

    const response = await fetch(`${DEEZER_API}/album/${albumId}/tracks`);
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    if (!data.data || data.data.length === 0) {
      return [];
    }

    const tracksWithAlbumContext = data.data
      .map((track) => {
        try {
          if (!track.album || !track.album.title) {
            track.album = {
              ...track.album,
              title: albumInfo.name,
              cover_xl: albumInfo.image,
              cover_big: albumInfo.image,
              cover_medium: albumInfo.image,
            };
          }

          if (!track.artist || !track.artist.name) {
            track.artist = {
              ...track.artist,
              name: albumInfo.artistName,
              id: albumInfo.artistId,
            };
          }

          return _transformTrackData(track);
        } catch (error) {
          console.error("Error transformando track:", error);
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