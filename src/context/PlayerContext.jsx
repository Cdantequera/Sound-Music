import { useState, useRef, useEffect } from "react";
import { PlayerContext } from "../hook/usePlayer";
import { useVolume } from "../hook/useVolume";

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const audioRef = useRef(new Audio());

  // Consumir el hook de volumen
  const { volume, increaseVolume, decreaseVolume, setVolume } = useVolume();

  // Este efecto ajusta el volumen en el elemento de audio real
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    const setAudioDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    let timerId = null;

    if (isPlaying) {
      timerId = setInterval(() => {
        if (audio.duration > 0) {
          const percentage = (audio.currentTime / audio.duration) * 100;
          setProgress(percentage);
        }
      }, 250);
    } else {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentTrack && currentTrack.preview_url) {
      audio.src = currentTrack.preview_url;
      audio.play().catch((e) => console.error("Error al reproducir el audio:", e));
      setIsPlaying(true);
      setProgress(0);
    } else {
      audio.pause();
      setIsPlaying(false);
      audio.src = "";
    }
  }, [currentTrack]);

  const playTrack = (track) => {
    console.log("Objeto 'track' recibido:", track);
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlayerVisible(true);
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => console.error("Error al reproducir:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.src = "";
    setCurrentTrack(null);
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setProgress(0);
    setDuration(0);
  };

  const seekTo = (percentage) => {
    const audio = audioRef.current;

    if (isNaN(audio.duration) || audio.duration === 0) return;

    const newTime = (percentage / 100) * audio.duration;

    audio.currentTime = newTime;
    setProgress(percentage);
  };

  const value = {
    currentTrack,
    isPlaying,
    progress,
    duration,
    isPlayerVisible,
    playTrack,
    togglePlayPause,
    seekTo,
    closePlayer,

    volume,
    increaseVolume,
    decreaseVolume,
    setVolume,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
