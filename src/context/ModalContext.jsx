import { useState } from "react";
import { ModalContext } from "../hook/useAuth";
// 3. Creamos el Proveedor que envolverá nuestra App
export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Funciones para controlar los modales
  const openLogin = () => {
    setIsRegisterOpen(false); // Cierra el de registro si está abierto
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false); // Cierra el de login si está abierto
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const value = {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    openRegister,
    closeModals,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
