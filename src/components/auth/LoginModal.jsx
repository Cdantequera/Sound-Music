import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import GoogleLoginButton from "./GoogleLoginButton";
import { useModals } from "../../hook/useAuth";
import Modal from "../common/Modal";

function LoginModal() {
  const navigate = useNavigate();
  const { isLoginOpen, closeModals, openRegister } = useModals();

  const handleLogin = () => {
    closeModals();
    navigate("/home");
  };

  const switchToRegister = () => {
    openRegister();
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={closeModals}>
      {isLoginOpen && (
        <div className="space-y-6">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Iniciar Sesión</h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              O{" "}
              <button
                onClick={switchToRegister}
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Crea una cuenta nueva
              </button>
            </p>
          </div>
          <LoginForm onLogin={handleLogin} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800 px-2 text-gray-400">O continúa con</span>
            </div>
          </div>
          <div className="mt-6">
            <GoogleLoginButton onLogin={handleLogin} />
          </div>
        </div>
      )}
    </Modal>
  );
}

export default LoginModal;
