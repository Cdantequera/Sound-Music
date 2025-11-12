import AdminLayout from "../../components/Admin/AdminLayout";
import { BarChart2 } from "lucide-react";

const FakeChart = ({ title }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
    <div className="h-64 bg-gray-700/50 rounded-md flex items-center justify-center">
      <BarChart2 size={40} className="text-gray-500" />
      <p className="text-gray-500 ml-2">(Simulación de gráfico)</p>
    </div>
  </div>
);

const TopList = ({ title, items }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
          <span className="text-gray-300">{item.name}</span>
          <span className="font-semibold text-white">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

function AdminStats() {
  const breadcrumbs = [{ label: "Dashboard", href: "/admin" }, { label: "Estadísticas" }];

  const topSearches = [
    { name: "Bad Bunny", value: "1,200" },
    { name: "Taylor Swift", value: "980" },
    { name: "Rock", value: "750" },
    { name: "Queen", value: "500" },
  ];

  return (
    <AdminLayout title="Estadísticas" breadcrumbs={breadcrumbs}>
      <div className="text-gray-400 mb-8">
        Análisis detallado del crecimiento de usuarios, términos de búsqueda más populares y
        canciones más escuchadas.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna de Gráficos (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <FakeChart title="Crecimiento de Nuevos Usuarios (Últimos 30 días)" />
          <FakeChart title="Canciones Más Reproducidas" />
        </div>

        {/* Columna de Listas (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          <TopList title="Términos Más Buscados" items={topSearches} />
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminStats;
