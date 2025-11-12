import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

class GoogleAuthService {
  //metodo para login
  async loginWithGoogle() {
    try {
      //esta linea le preguntara a google que cuanta de usuario debe sellecionar
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      //crear un objeto de usuario que sea compatible con nuestra app exoistenete

      const userData = {
        id: user.id,
        email: user.email,
        userName: user.displayName || user.email.split("@")[0],
        name: user.displayName,
        photoURL: user.photoURL,
        provider: "google",
      };

      //guardalro en localstorage igual que hicimoos en form original

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  //metodo para logout

  async logout() {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      console.error("Error al cerrar sesión de Google:", error);
    }
  }

  // metodo para manejar lso errores de google
  getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/popup-closed-by-user":
        return "Login cancelado por el usuario";
      case "auth/popup-blocked":
        return "Popup bloqueado. Permite popups para este sitio";
      case "auth/network-request-failed":
        return "Error de conexión. Verifica tu internet";
      case "auth/too-many-requests":
        return "Demasiados intentos. Intenta más tarde";
      default:
        return "Error al iniciar sesión con Google";
    }
  }
}

//crear una instancia unica del servicio

const googleAuthService = new GoogleAuthService();

export default googleAuthService;
