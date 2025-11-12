import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
import Input from "../common/Input";
import bcrypt from "bcryptjs";
import Button from "../common/Button";

function RegisterForm({ onRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { ...userData } = data;

      let users = [];
      try {
        const stored = JSON.parse(localStorage.getItem("users"));
        if (Array.isArray(stored)) {
          users = stored;
        }
      } catch (e) {
        console.error("Error al parsear usuarios:", e);
      }

      // Verificar si el usuario ya existe
      if (users.find((u) => u.email === userData.email)) {
        toast.error("El Usuario ya existe");
        return;
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      const userToSave = {
        ...userData,
        password: hashedPassword,
      };

      users.push(userToSave);
      localStorage.setItem("users", JSON.stringify(users));

      const userWithoutHash = { ...userData, password: undefined };
      localStorage.setItem("user", JSON.stringify(userWithoutHash));

      onRegister(userWithoutHash);
      toast.success("Registro exitoso :)");
    } catch (error) {
      console.log(error);
      toast.error("Error en el registro :(");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Usuario"
        type="text"
        name="userName"
        placeholder="Tu usuario"
        register={register}
        error={errors.userName}
      />
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
      <Input
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        placeholder="••••••"
        register={register}
        error={errors.confirmPassword}
      />
      <Button onClick={isSubmitting} className="hidden lg:inline-flex w-full   ">
        {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
}

export default RegisterForm;
