function Modal({ isOpen, onClose, children }) {
  return (
    // 1. CONTENEDOR PRINCIPAL (Overlay)
    <div
      onClick={onClose}
      className={`
        fixed inset-0  flex
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        z-100
      `}
    >
      {/* 2. PANEL DESLIZABLE (Slider) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative bg-gray-800 shadow-xl
          w-80 h-full p-6
          transform transition-transform 
          duration-500                 
          ease-in-out                  
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Botón de Cerrar (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl z-10"
        >
          &times;
        </button>

        {/* Tu contenido (formularios) */}
        {children}
      </div>

      <div className="grow"></div>
    </div>
  );
}

export default Modal;
