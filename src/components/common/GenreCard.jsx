function GenreCard({ genre, onClick }) {
  if (!genre) return null;

  const handleClick = () => {
    if (onClick) {
      onClick(genre.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center cursor-pointer transition-color sw-32 shrink-0 group"
    >
      <img
        src={genre.image}
        alt={genre.name}
        className="w-24 h-24 rounded-full object-cover mb-3
                   transition-transform duration-300 group-hover:scale-110" // Efecto hover en la imagen
      />

      <div className="overflow-hidden text-center">
        <p
          className="font-semibold text-gray-800 dark:text-white truncate
                      group-hover:text-pink-500 transition-colors" // Efecto hover en el texto
        >
          {genre.name}
        </p>
      </div>
    </div>
  );
}

export default GenreCard;
