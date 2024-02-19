import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

export async function signUp(name: string, email: string, password: string) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(response.user, {
      displayName: name,
      photoURL: `https://api.multiavatar.com/${response.user.uid}.png?apikey=${process.env.NEXT_PUBLIC_MULTIAVATAR_API_KEY}`,
    });
    return response as UserCredential & {
      user: User & { accessToken: string };
    };
  } catch (error: any) {
    return {
      error: error.message?.includes("auth/email-already-in-use")
        ? "El email ya está siendo usado"
        : "Hubo un problema al iniciar sesión",
      user: null,
    };
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    return response as UserCredential & {
      user: User & { accessToken: string };
    };
  } catch (error: any) {
    return {
      error: error.message?.includes("auth/invalid-credential")
        ? "El email o la contraseña es inválido"
        : "Hubo un problema al iniciar sesión",
      user: null,
    };
  }
}

export async function recoverPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: "El email de recuperación ha sido enviado a tu correo",
      error: "",
    };
  } catch (error) {
    return { error: "Hubo un error al enviar el email de recuperación" };
  }
}
