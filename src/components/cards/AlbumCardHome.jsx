import { useNavigate } from "react-router-dom";

function AlbumCardHomeCarousel({ album }) {
  const navigate = useNavigate();

  // Función específica para navegar a la página de la lista de álbumes
  const handleNavigateToList = () => {
    navigate("/albunes");
  };

  return (
    <div
      className="shrink-0  h-auto flex flex-col justify-start rounded-lg 
             cursor-pointer transition-all duration-300 group p-3 
             hover:bg-black/20 
             w-48"
      onClick={handleNavigateToList}
      title={`${album.name} - ${album.artistName}`}
    >
      {/* Imagen del Álbum */}
      <div className="relative w-full aspect-square mb-3">
        {" "}
        {/* Contenedor cuadrado para la imagen */}
        <img
          src={album.image}
          alt={album.name}
          className="w-full h-full rounded-md object-cover 
                       // Quitamos shadow-lg y group-hover:opacity-80
                       transition-opacity"
        />
      </div>

      {/* Información del Álbum (2 líneas) */}
      <div className="flex flex-col text-left">
        <p className="font-semibold text-white truncate text-base leading-tight">
          {" "}
          {/* Ajustamos a text-white, sin mb-1 */}
          {album.name}
        </p>
        <p className="text-sm text-gray-400 truncate leading-tight">
          {" "}
          {/* Ajustamos a text-gray-400 */}
          {album.artistName}
        </p>
      </div>
    </div>
  );
}

export default AlbumCardHomeCarousel;
