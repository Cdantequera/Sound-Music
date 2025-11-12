import { PanelLeftOpen } from "lucide-react";

function SidebarToggle({ onOpenSidebar }) {
  return (
    <button
      onClick={onOpenSidebar}
      className="fixed top-1/2 -translate-y-1/2 left-0 z-40
                 bg-linear-to-r from-purple-600 to-pink-600 
                 text-white 
                 p-3 
                 rounded-r-xl 
                 shadow-lg 
                 transition-all duration-300 
                 hover:from-purple-700 hover:to-pink-700 hover:scale-105
                 focus:outline-none focus:ring-2 focus:ring-pink-500"
      aria-label="Abrir menú"
    >
      <PanelLeftOpen className="w-6 h-6" />
    </button>
  );
}

export default SidebarToggle;
