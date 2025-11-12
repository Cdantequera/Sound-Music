import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../hook/useAuth";
import { SearchProvider } from "../context/SearchContext";
import { PlayerProvider } from "../context/PlayerContext";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import SidebarToggle from "../components/common/SidebarToggle";

function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!user;

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SearchProvider>
      <PlayerProvider>
        <div className=" w-full h-full overflow-y-auto overflow-x-hidden min-h-screen flex flex-col bg-gray-50 dark:bg-transparent [&::-webkit-scrollbar]:w-0 ">
          <div className="w-full flex-1 p-4 flex flex-col">
            <Header />

            <div className="flex flex-1 pt-16">
              {isAuthenticated && (
                <>
                  <SidebarToggle onOpenSidebar={handleOpenSidebar} />

                  <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
                </>
              )}

              <main className="flex-1 w-full min-w-0">{children}</main>
            </div>
          </div>
          {isAuthenticated && <MusicPlayer />}
        </div>
      </PlayerProvider>
    </SearchProvider>
  );
}

export default UserLayout;
