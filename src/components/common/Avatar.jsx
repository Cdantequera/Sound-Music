import { User, Shield } from "lucide-react";

function Avatar({
  src,
  alt = "Avatar",
  className = "w-10 h-10",
  iconClassName = "w-5 h-5",
  isAdmin = false,
}) {
  // Estilos diferentes para admin
  const adminStyles = isAdmin
    ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-400"
    : "bg-gradient-to-r from-pink-400 to-purple-500 border-pink-400";

  return (
    <div
      className={`${className} rounded-full ${adminStyles} flex items-center justify-center border-2 shadow-lg overflow-hidden`}
    >
      {src ? (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
          onError={(e) => {
            // Si la imagen falla al cargar, ocultar el elemento img
            e.target.style.display = "none";
            // Mostrar el icono de usuario
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className={`${src ? "hidden" : "flex"} items-center justify-center w-full h-full text-white`}
        style={{ display: src ? "none" : "flex" }}
      >
        {isAdmin ? <Shield className={iconClassName} /> : <User className={iconClassName} />}
      </div>
    </div>
  );
}

export default Avatar;
