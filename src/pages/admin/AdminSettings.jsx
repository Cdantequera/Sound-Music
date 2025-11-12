import AdminLayout from "../../components/Admin/AdminLayout";
import { Save, AlertCircle, Key } from "lucide-react";
import { useState } from "react";

function AdminSettings() {
  const breadcrumbs = [{ label: "Dashboard", href: "/admin" }, { label: "Configuración" }];

  const [siteName, setSiteName] = useState("Sound-Music");
  const [apiKey, setApiKey] = useState("DEEZER_API_KEY_OCULTA_****");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Configuración  guardada con éxito.");
  };

  return (
    <AdminLayout title="Configuración" breadcrumbs={breadcrumbs}>
      <div className="text-gray-400 mb-8">
        Ajustes generales del sitio. Los cambios aquí son ficticios y no se guardarán.
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
          {/* Campo Nombre del Sitio */}
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Sitio
            </label>
            <input
              type="text"
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700/50 text-white border border-gray-700 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Campo API Key */}
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
              API Key
            </label>
            <div className="relative">
              <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2 pl-10 rounded bg-gray-700/50 text-white border border-gray-700 focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          {/* Zona de Peligro  */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Zona de Peligro</h3>
            <div className="bg-red-900/30 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-red-300">Borrar Caché</p>
                <p className="text-sm text-red-400">Esto limpiará todos los datos cacheados.</p>
              </div>
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                onClick={() => alert("Caché  borrada.")}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Botón de Guardar */}
          <div className="text-right border-t border-gray-700 pt-6">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminSettings;
