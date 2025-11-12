import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="relative min-h-screen">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/public/Fondos/Fondo-error-404.png')" }}
      />
      {/* Capa de contraste */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center text-gray-800 dark:text-gray-100 px-4">
        <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-fuchsia-400 to-fuchsia-700 drop-shadow-[0_0_25px_rgba(139,92,246,0.8)]">
          404
        </h1>

        <p className="text-2xl md:text-3xl font-semibold mt-4">Ups... página no encontrada</p>

        <p className="mt-2 mb-8 max-w-md">
          Parece que te perdiste entre los acordes 🎵. No te preocupes, podés volver al inicio.
        </p>

        <Link
          to="/home"
          className="px-4 py-3 text-center uppercase text-white rounded-lg shadow-lg block bg-linear-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition duration-500 ease-in-out"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
