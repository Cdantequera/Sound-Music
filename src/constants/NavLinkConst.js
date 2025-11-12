import {
  Home,
  TrendingUp,
  Music,
  Disc,
  Headphones,
  Heart,
  ListMusic,
  Info,
  Shield,
  UserCog,
  ListPlus,
} from "lucide-react";

export const PAGES_NAVIGATE = [
  {
    name: "Inicio",
    icon: Home,
    href: "/home",
  },
  {
    name: "Tendencias",
    icon: TrendingUp,
    href: "/tendencias",
  },
  {
    name: "Géneros",
    icon: Music,
    href: "/generos",
  },
  {
    name: "Álbumes",
    icon: Disc,
    href: "/albunes",
  },
];

export const PAGES_MUSICA = [
  {
    name: "Canciones",
    icon: Headphones,
    href: "/canciones",
  },
];
export const PAGES_FAVORITOS = (handlers) => [
  {
    name: "Favoritos",
    icon: Heart,
    onClick: handlers.showFavoritos,
  },
  {
    name: "Mis Playlists",
    icon: ListMusic,
    onClick: handlers.showPlaylists,
  },
  {
    name: "Crear Playlist",
    icon: ListPlus,
    onClick: handlers.showCrearPlaylist,
  },
];

export const FOOTER_LINKS = [
  {
    name: "Acerca de",
    icon: Info,
    href: "/about",
  },
];

export const getFooterLinks = (isAdmin = false) => {
  const baseLinks = [...FOOTER_LINKS];

  if (isAdmin) {
    return [...baseLinks, ...ADMIN_LINKS];
  }

  return baseLinks;
};

export const ADMIN_LINKS = [
  {
    name: "Panel Admin",
    icon: Shield,
    href: "/admin",
  },
  {
    name: "Gestión Usuarios",
    icon: UserCog,
    href: "/admin/users",
  },
];

export const genres = [
  { name: "Pop", linear: "from-pink-500 to-purple-800" },
  { name: "Rock", linear: "from-red-500 to-orange-600" },
  { name: "Hip Hop", linear: "from-yellow-500 to-red-600" },
  { name: "Reggaeton", linear: "from-green-500 to-teal-600" },
  { name: "Electronic", linear: "from-blue-500 to-purple-600" },
  { name: "Jazz", linear: "from-indigo-500 to-blue-600" },
];
