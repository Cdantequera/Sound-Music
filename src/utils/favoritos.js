// Obtener el ID del usuario actual
const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.id || user?.email || "guest";
};

// Funciones para favoritos por usuario
export const getFavorites = (userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  return JSON.parse(localStorage.getItem(`favorites_${currentUserId}`) || "[]");
};

export const toggleFavorite = (trackId, userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  let favs = getFavorites(currentUserId);

  if (favs.includes(trackId)) {
    favs = favs.filter((f) => f !== trackId);
  } else {
    favs.push(trackId);
  }

  localStorage.setItem(`favorites_${currentUserId}`, JSON.stringify(favs));
  return favs;
};

export const isFavorite = (trackId, userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  const favs = getFavorites(currentUserId);
  return favs.includes(trackId);
};

// Funciones para playlists por usuario
export const getPlaylists = (userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  return JSON.parse(localStorage.getItem(`playlists_${currentUserId}`) || "{}");
};

export const savePlaylist = (name, trackIds, userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  const playlists = getPlaylists(currentUserId);
  playlists[name] = trackIds;
  localStorage.setItem(`playlists_${currentUserId}`, JSON.stringify(playlists));
  return playlists;
};

export const deletePlaylist = (name, userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  const playlists = getPlaylists(currentUserId);
  delete playlists[name];
  localStorage.setItem(`playlists_${currentUserId}`, JSON.stringify(playlists));
  return playlists;
};

// Función para limpiar datos al cerrar sesión
export const clearUserData = (userId = null) => {
  const currentUserId = userId || getCurrentUserId();
  localStorage.removeItem(`favorites_${currentUserId}`);
  localStorage.removeItem(`playlists_${currentUserId}`);
};

// Función para migrar datos antiguos (si existen)
export const migrateOldData = () => {
  const currentUserId = getCurrentUserId();

  // Migrar favoritos antiguos
  const oldFavorites = localStorage.getItem("favorites");
  if (oldFavorites && !localStorage.getItem(`favorites_${currentUserId}`)) {
    localStorage.setItem(`favorites_${currentUserId}`, oldFavorites);
    localStorage.removeItem("favorites");
  }

  // Migrar playlists antiguas
  const oldPlaylists = localStorage.getItem("playlists");
  if (oldPlaylists && !localStorage.getItem(`playlists_${currentUserId}`)) {
    localStorage.setItem(`playlists_${currentUserId}`, oldPlaylists);
    localStorage.removeItem("playlists");
  }
};
