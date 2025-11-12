import { User, Settings, LogOut, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hook/useAuth";
import Avatar from "../common/Avatar";

const CERRAR_SESION = "Cerrar Sesión";

function Dropdown({ closeUserMenu }) {
  const { user, logout, isAdmin } = useAuth();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    closeUserMenu();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={closeUserMenu}></div>

      <div className="absolute right-0 mt-3 w-64 sm:w-72 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden">
        <div className="p-4 sm:p-6 bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <Avatar
                src={user?.photoURL}
                alt="Foto de perfil"
                className="w-10 sm:w-12 h-10 sm:h-12"
                iconClassName="w-4 sm:w-5 h-4 sm:h-5"
                isAdmin={isAdmin()}
              />
              <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                {user?.userName || "Usuario"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                {user?.email}
              </p>
              <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                En línea
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex justify-between items-center gap-2 mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
              Apariencia
            </span>
          </div>
          <div className="flex gap-1 sm:gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button
              onClick={() => handleThemeChange("light")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                theme === "light"
                  ? "bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400"
              }`}
              title="Modo claro"
            >
              <Sun className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden sm:inline">Claro</span>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                theme === "dark"
                  ? "bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400"
              }`}
              title="Modo oscuro"
            >
              <Moon className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden sm:inline">Oscuro</span>
            </button>
          </div>
        </div>

        <div className="p-2 sm:p-3">
          <div className="my-2 border-t border-gray-200/50 dark:border-gray-700/50"></div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:bg-linear-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-red-200/50 dark:hover:border-red-700/50"
          >
            <LogOut className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>{CERRAR_SESION}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
