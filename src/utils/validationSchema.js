import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").trim().toLowerCase(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z
  .object({
    userName: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").trim(),
    email: z.string().email("Email inválido").trim().toLowerCase(),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
      .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título debe tener menos de 100 caracteres") // Establecer un máximo para el título
    .trim(),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    // CORREGIDO: mensaje de error (usamos 500 para mayor flexibilidad, ajusta el mensaje)
    .max(500, "La descripción debe tener menos de 500 caracteres")
    .trim(),
  // MEJORA: Validar que sea un formato de fecha válido (ISO 8601, ej: '2025-12-31')
  date: z.string().datetime({ message: "Formato de fecha inválido" }).optional().or(z.literal("")),
});
