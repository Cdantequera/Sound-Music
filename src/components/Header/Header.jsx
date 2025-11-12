import { useState } from "react";
import Buscador from "../common/Buscador";
import Button from "../common/Button";
import { useModals } from "../../hook/useAuth";
import { useAuth } from "../../hook/useAuth";
import { ChevronDown } from "lucide-react";
import { LOGO_VMUSIC } from "../../constants/imagenes";
import Dropdown from "./Dropdown";
import Avatar from "../common/Avatar";
import { useSearch } from "../../hook/useAuth";
import { useNavigate, Link } from "react-router-dom";

const logo = LOGO_VMUSIC[0];
const INICIO_SESION = "Iniciar Sesión";
const REGISTRARSE = "Registrarse";

function Header() {
  const { openLogin, openRegister } = useModals();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const { handleSearch } = useSearch();
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const onHandleSearchAndNavigate = (query) => {
    handleSearch(query);
    navigate("/home");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-zinc-100 text-sm py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-linear-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="w-full flex items-center gap-x-4">
          <Link to="/home" className="flex items-center gap-1 p-2" aria-label="Ir a Inicio">
            <img src={logo.src} alt={logo.alt} width={35} />

            <div className="hidden sm:flex items-center gap-1">
              <span className="text-xl md:text-2xl font-bold px-1 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Sound-Music
              </span>
            </div>
          </Link>

          {isAuthenticated && (
            <div className="flex-1 sm:max-w-md md:max-w-2xl">
              <Buscador onSearch={onHandleSearchAndNavigate} />
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {!isAuthenticated ? (
              <>
                <Button onClick={openLogin} className="hidden lg:inline-flex">
                  {INICIO_SESION}
                </Button>
                <Button
                  onClick={openRegister}
                  variant="primary"
                  className="hidden lg:inline-flex  "
                >
                  {REGISTRARSE}
                </Button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-linear-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-pink-200/50 dark:hover:border-pink-700/50"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="relative">
                    <Avatar
                      src={user?.photoURL}
                      alt="Foto de perfil"
                      className="w-8 sm:w-10 h-8 "
                      iconClassName="w-3 sm:w-4 h-3 sm:w-4"
                      isAdmin={isAdmin()}
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3  bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  </div>
                  <ChevronDown
                    className={`w-3 sm:w-4 h-3  text-gray-600 dark:text-gray-400 transition-all duration-300 ${
                      isUserMenuOpen ? "rotate-180 text-pink-600 dark:text-pink-400" : ""
                    }`}
                  />
                </button>

                {isUserMenuOpen && <Dropdown closeUserMenu={closeUserMenu} />}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
