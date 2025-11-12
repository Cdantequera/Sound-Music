import { useState, useEffect } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useAuth } from "../../hook/useAuth";
import bcrypt from "bcryptjs";
import { Plus, Trash2, Lock, Unlock, AlertCircle } from "lucide-react";

const USERS_STORAGE_KEY = "users";

// Función para generar un ID único
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

function AdminUsers() {
  const { user: adminUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [formError, setFormError] = useState("");

  // --- 1. FUNCIÓN DE CARGA  ---
  const loadUsers = () => {
    setIsLoading(true);
    try {
      const usersInStorage = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
      // Aseguramos que CADA usuario tenga un ID, ROL y ESTADO
      const sanitizedUsers = usersInStorage.map((u) => ({
        ...u,
        id: u.id || u.email,
        role: u.role || "user",
        status: u.status || "active",
      }));
      setUsers(sanitizedUsers);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // --- 2. FUNCIÓN AÑADIR  ---
  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Email y Contraseña son obligatorios.");
      return;
    }

    try {
      const currentUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
      if (currentUsers.find((u) => u.email === email)) {
        setFormError("El email ya está registrado.");
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Usamos la función para un ID único
      const newUser = {
        id: generateUniqueId(),
        email: email,
        userName: email.split("@")[0],
        password: hashedPassword,
        role: role,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...currentUsers, newUser];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

      setEmail("");
      setPassword("");
      setRole("user");
      loadUsers();
      alert("Usuario añadido con éxito!");
    } catch (error) {
      console.error("Error al añadir usuario:", error);
      setFormError("Hubo un error al añadir el usuario.");
    }
  };

  // --- 3. FUNCIÓN ELIMINAR  ---
  const handleDeleteUser = (userId) => {
    if (userId === adminUser.id) {
      alert("No puedes eliminar tu propia cuenta.");
      return;
    }
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      loadUsers();
    }
  };

  // --- 4. FUNCIÓN BLOQUEAR  ---
  const handleToggleBlock = (userId) => {
    if (userId === adminUser.id) {
      alert("No puedes bloquear tu propia cuenta.");
      return;
    }
    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    loadUsers();
  };

  const breadcrumbs = [{ label: "Dashboard", href: "/admin" }, { label: "Gestión de Usuarios" }];

  return (
    <AdminLayout title="Gestión de Usuarios" breadcrumbs={breadcrumbs}>
      {/* --- SECCIÓN AÑADIR USUARIO --- */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Añadir Nuevo Usuario</h2>
        {formError && (
          <div className="bg-red-900/30 text-red-400 p-3 rounded-md mb-4 flex items-center gap-2">
            <AlertCircle size={18} /> {formError}
          </div>
        )}
        <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-700/50 text-white border border-gray-700 focus:border-purple-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-700/50 text-white border border-gray-700 focus:border-purple-500 outline-none"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 rounded bg-gray-700/50 text-white border border-gray-700 focus:border-purple-500 outline-none"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Añadir
          </button>
        </form>
      </div>

      {/* --- SECCIÓN LISTA DE USUARIOS --- */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-white mb-4">Usuarios Registrados</h2>
        {isLoading ? (
          <p className="text-gray-400">Cargando usuarios...</p>
        ) : (
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-4 text-gray-400">Usuario</th>
                <th className="p-4 text-gray-400">Rol</th>
                <th className="p-4 text-gray-400">Estado</th>
                <th className="p-4 text-gray-400 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-medium">{user.userName || user.email.split("@")[0]}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-900/30 text-purple-300"
                          : "bg-gray-700/30 text-gray-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-900/30 text-green-300"
                          : "bg-red-900/30 text-red-300"
                      }`}
                    >
                      {user.status === "active" ? "Activo" : "Bloqueado"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleBlock(user.id)}
                      title={user.status === "active" ? "Bloquear" : "Desbloquear"}
                      className="p-2 rounded-full transition-colors mr-2 text-yellow-500 hover:bg-yellow-900/30"
                      disabled={user.id === adminUser.id}
                    >
                      {user.status === "active" ? <Lock size={18} /> : <Unlock size={18} />}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      title="Eliminar"
                      className="p-2 rounded-full text-red-500 hover:bg-red-900/30 transition-colors"
                      disabled={user.id === adminUser.id}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;
