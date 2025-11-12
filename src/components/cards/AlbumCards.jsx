import { useNavigate } from "react-router-dom";

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const handleNavigateTo404 = () => {
    // Navega a la ruta 404
    navigate("/404");
    console.log("Navegando a 404 por álbum:", album.id);
  };

  return (
    <div
      className="shrink-0 w-40 sm:w-48 cursor-pointer group"
      onClick={handleNavigateTo404} 
      title={`${album.name} - ${album.artistName}`}
    >
      {/* Imagen del Álbum */}
      <img
        src={album.image}
        alt={album.name}
        className="w-full h-40 sm:h-48 rounded-lg object-cover shadow-lg 
                  group-hover:opacity-80 transition-opacity"
      />

      {/* Información del Álbum */}
      <p className="font-semibold text-gray-800 dark:text-white truncate mt-2">{album.name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{album.artistName}</p>
    </div>
  );
}

export default AlbumCard;
