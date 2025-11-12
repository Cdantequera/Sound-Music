import { Play, Heart, List, Search, Star, Music, Users } from "lucide-react";

export const features = [
  {
    icon: <Search size={40} />,
    title: "Busca tu música favorita",
    description: "Encuentra millones de canciones de tus artistas favoritos",
  },
  {
    icon: <Play size={40} />,
    title: "Reproduce al instante",
    description: "Escucha previews de 30 segundos de cualquier canción",
  },
  {
    icon: <Heart size={40} />,
    title: "Guarda tus favoritos",
    description: "Crea tu colección personal de canciones favoritas",
  },
  {
    icon: <List size={40} />,
    title: "Crea playlists",
    description: "Organiza tu música en playlists personalizadas",
  },
];

export const featuresAbout = [
  {
    icon: <Music size={40} />,
    title: "Millones de Canciones",
    description:
      "Accede a una biblioteca musical extensa con los últimos éxitos y clásicos atemporales.",
  },
  {
    icon: <Heart size={40} />,
    title: "Favoritos Personalizados",
    description: "Guarda tus canciones favoritas y crea tu colección musical personalizada.",
  },
  {
    icon: <Users size={40} />,
    title: "Descubre Artistas",
    description: "Explora nuevos artistas y mantente al día con tus músicos favoritos.",
  },
  {
    icon: <Star size={40} />,
    title: "Playlists Inteligentes",
    description: "Crea y organiza playlists que se adapten a tu estado de ánimo y momento.",
  },
];
