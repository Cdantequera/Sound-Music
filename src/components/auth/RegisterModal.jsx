import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { useModals } from "../../hook/useAuth";
import { useAuth } from "../../hook/useAuth";
import Modal from "../common/Modal";

function RegisterModal() {
  const navigate = useNavigate();
  const { isRegisterOpen, closeModals, openLogin } = useModals();
  const { login } = useAuth();

  const handleRegister = (user) => {
    login(user);
    closeModals();
    navigate("/home");
  };

  const switchToLogin = () => {
    openLogin();
  };

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeModals}>
      {isRegisterOpen && (
        <div className="space-y-6">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Crear Cuenta</h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              O{" "}
              <button
                onClick={switchToLogin}
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
          <RegisterForm onRegister={handleRegister} />
        </div>
      )}
    </Modal>
  );
}

export default RegisterModal;
