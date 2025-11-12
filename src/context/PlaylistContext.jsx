import { useState } from "react";
import { toast } from "react-toastify";

import { PlaylistContext } from "../hook/usePlaylist";

export const PlaylistProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackToAdd, setTrackToAdd] = useState(null);

  const openPlaylistModal = (track) => {
    setTrackToAdd(track);
    setIsModalOpen(true);
  };

  const closePlaylistModal = () => {
    setIsModalOpen(false);
    setTrackToAdd(null);
  };

  const addTrackToPlaylist = (playlistId) => {
    if (!trackToAdd) return;

    // Leemos las playlists de localStorage (igual que en Playlists.jsx)
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]");

    const playlistIndex = savedPlaylists.findIndex((p) => p.id === playlistId);

    if (playlistIndex === -1) {
      toast.error("Error: No se encontró la playlist.");
      return;
    }

    const playlist = savedPlaylists[playlistIndex];

    // Evitar duplicados
    const trackExists = playlist.tracks.some((t) => t.id === trackToAdd.id);

    if (trackExists) {
      toast.info(`"${trackToAdd.name}" ya está en "${playlist.name}"`);
    } else {
      // Añadimos el track completo (o solo el ID, si prefieres)
      playlist.tracks.push(trackToAdd);
      savedPlaylists[playlistIndex] = playlist;

      // Guardamos la lista actualizada
      localStorage.setItem("playlists", JSON.stringify(savedPlaylists));
      toast.success(`¡"${trackToAdd.name}" añadido a "${playlist.name}"!`);
    }

    // Cerramos el modal
    closePlaylistModal();
  };

  return (
    <PlaylistContext.Provider
      value={{
        isModalOpen,
        trackToAdd,
        openPlaylistModal,
        closePlaylistModal,
        addTrackToPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
