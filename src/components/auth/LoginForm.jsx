import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import bcrypt from "bcryptjs";
import { useAuth } from "../../hook/useAuth";
import Button from "../common/Button";

function LoginForm({ onLogin }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === data.email);

      if (user) {
        // Verificamos si el usuario tiene un estado y si está bloqueado.
        if (user.status && user.status === "blocked") {
          toast.error("Tu cuenta ha sido bloqueada. Contacta al administrador.");
          return; // Detiene el inicio de sesión
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);

        if (isValidPassword) {
          const userWithoutPassword = { ...user, password: undefined };

          login(userWithoutPassword);
          onLogin(userWithoutPassword);
          toast.success("Login exitoso");

          if (userWithoutPassword.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        } else {
          toast.error("Credenciales incorrectas");
        }
      } else {
        toast.error("Usuario no encontrado");
      }
    } catch (error) {
      console.error("❌ Error en login:", error);
      toast.error("Error en el login :(");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="tu@email.com"
        register={register}
        error={errors.email}
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="••••••"
        register={register}
        error={errors.password}
      />
      <Button onClick={isSubmitting} className="hidden lg:inline-flex w-full   ">
        {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
}

export default LoginForm;
