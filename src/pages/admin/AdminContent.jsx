import AdminLayout from "../../components/Admin/AdminLayout";
import { ListMusic, Star, Ban } from "lucide-react";

const ContentItem = ({ title, description, image, status }) => (
  <div className="bg-gray-700/50 rounded-lg shadow-lg flex items-center gap-4 p-4 border border-gray-700">
    <img src={image} alt={title} className="w-20 h-20 rounded-md object-cover" />
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <div className="flex flex-col items-center gap-2">
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          status === "active" ? "bg-green-800/30 text-green-300" : "bg-gray-700/30 text-gray-300"
        }`}
      >
        {status === "active" ? "Visible" : "Oculto"}
      </span>
      <div className="flex gap-2 mt-2">
        <button className="p-2 rounded-full text-yellow-500 hover:bg-yellow-900/30">
          <Star size={16} />
        </button>
        <button className="p-2 rounded-full text-red-500 hover:bg-red-900/30">
          <Ban size={16} />
        </button>
      </div>
    </div>
  </div>
);

function AdminContent() {
  const breadcrumbs = [{ label: "Dashboard", href: "/admin" }, { label: "Gestión de Contenido" }];

  return (
    <AdminLayout title="Gestión de Contenido" breadcrumbs={breadcrumbs}>
      <div className="text-gray-400 mb-8">
        Aquí es donde podrías gestionar las playlists destacadas, promocionar álbumes o editar los
        géneros que aparecen en la página principal.
      </div>

      <div className="space-y-6">
        {/* Sección de Playlists Destacadas */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ListMusic size={20} />
            Playlists Destacadas
          </h2>
          <div className="space-y-4">
            <ContentItem
              title="Éxitos del Verano"
              description="La mejor música para disfrutar del sol."
              image="https://i.scdn.co/image/ab67706f00000002b5a6cff9c2a7f050b1d3a436"
              status="active"
            />
            <ContentItem
              title="Top Rock"
              description="Clásicos del rock de todos los tiempos."
              image="https://i.scdn.co/image/ab67706f000000027876fe166a29b8e6b8db14da"
              status="active"
            />
            <ContentItem
              title="Novedades (Oculto)"
              description="Próximamente..."
              image="https://i.scdn.co/image/ab67706f00000002abaf6c3c6a4b29f8a4565a80"
              status="hidden"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminContent;
