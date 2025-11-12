import { useState, useEffect } from "react";
import { getPopularTracks } from "../services/deezerApi";
import { usePlayer } from "../hook/usePlayer";
import SongCard from "../components/common/SongCard";

function Tendencias() {
  const [popularTracks, setPopularTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playTrack } = usePlayer();

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      const tracks = await getPopularTracks();
      setPopularTracks(tracks);
      setIsLoading(false);
    };
    fetchTracks();
  }, []);

  // La función que llama el SongCard
  const handlePlay = (track) => {
    playTrack(track);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Tendencias</h1>

      {isLoading ? (
        <p className="text-gray-400">Cargando tendencias...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* AÑADE UN '?' ANTES DE .map */}
          {popularTracks?.map((track) => (
            <li key={track.id}>
              {/* Usamos el SongCard reutilizable */}
              <SongCard track={track} onPlay={handlePlay} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tendencias;
