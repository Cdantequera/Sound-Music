import { useState } from "react";
import { toast } from "react-toastify";
import googleAuthService from "../../services/googleAuth";
import { useAuth } from "../../hook/useAuth";

function GoogleLoginButton({ onLogin }) {
  const { login } = useAuth(); // 2. OBTENER la función login
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // 1. Obtenemos el usuario de Google (como antes)
      const googleUser = await googleAuthService.loginWithGoogle();

      // 2. Leemos la base de datos de localStorage
      let users = [];
      try {
        const stored = JSON.parse(localStorage.getItem("users"));
        if (Array.isArray(stored)) {
          users = stored;
        }
      } catch (e) {
        console.error("Error al parsear usuarios:", e);
      }

      // 3. Verificamos si el usuario de Google ya existe en localStorage
      let userInDb = users.find((u) => u.email === googleUser.email);

      if (!userInDb) {
        // 4. SI NO EXISTE: Lo creamos y lo guardamos en localStorage
        console.log("Creando nuevo usuario de Google en localStorage...");

        // Creamos un usuario compatible con tu sistema
        const newUser = {
          id: googleUser.id, // O Date.now() si prefieres
          userName: googleUser.userName,
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          role: "user",
          provider: "google",
          // No guardamos contraseña, ya que es de Google
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        userInDb = newUser; // El usuario que usaremos es el que acabamos de crear
      }

      // 5.Llamamos al login del contexto y cerramos el modal
      login(userInDb);
      onLogin(userInDb); // onLogin es la prop que cierra el modal

      toast.success("Login con Google exitoso");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-800 bg-white hover:bg-gray-50"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span className="ml-3" viewBox="0 0 24 24">
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
      </span>
    </button>
  );
}

export default GoogleLoginButton;
