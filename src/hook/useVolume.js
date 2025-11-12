import { useState, useCallback } from "react";

// Define el valor máximo y mínimo para el volumen (0 a 100)
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;
const VOLUME_STEP = 10;

export const useVolume = () => {
  // Inicializa el volumen al 50%
  const [volume, setVolumeState] = useState(50);

  // Función para establecer el volumen de forma segura, respetando los límites
  const setVolume = useCallback((newVolume) => {
    // Asegura que el volumen se mantenga entre MIN_VOLUME y MAX_VOLUME
    const safeVolume = Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, newVolume));
    setVolumeState(safeVolume);
  }, []);

  // Función para subir el volumen en un paso (VOLUME_STEP)
  const increaseVolume = useCallback(() => {
    setVolume((prevVolume) => prevVolume + VOLUME_STEP);
  }, [setVolume]);

  // Función para bajar el volumen en un paso (VOLUME_STEP)
  const decreaseVolume = useCallback(() => {
    setVolume((prevVolume) => prevVolume - VOLUME_STEP);
  }, [setVolume]);

  return {
    volume,
    setVolume,
    increaseVolume,
    decreaseVolume,
  };
};
