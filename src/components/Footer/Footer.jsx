import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Twitch, Youtube } from "lucide-react";
function Footer() {
  return (
    <footer className="border-b border-gray-200/50 dark: bg-transparent  text-gray-200 overflow-hidden">
      {/* Contenido */}
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-6 gap-4 bg-black/30">
        {/* Derechos */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold">Sound-Music</span> — Todos
          los derechos reservados
        </p>

        <Link
          to="/about"
          className="relative text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-purple-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
        >
          Sobre Nosotros
        </Link>

        {/* Redes sociales */}
        <div className="flex space-x-5">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-purple-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.twitch.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-purple-400 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <Twitch size={20} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <Youtube size={20} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
