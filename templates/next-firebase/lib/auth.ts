import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

export async function signInWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function createAccount(email: string, password: string) {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(credential.user);
  return credential;
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  return signInWithPopup(auth, googleProvider);
}

export async function resetPassword(email: string) {
  const auth = getFirebaseAuth();
  return sendPasswordResetEmail(auth, email);
}

export async function sendVerificationEmail(user: User) {
  return sendEmailVerification(user);
}

export async function signOutUser() {
  const auth = getFirebaseAuth();
  return signOut(auth);
}

export function getDisplayName(user: User | null): string {
  return user?.displayName ?? user?.email ?? "Signed in user";
}

export function formatAuthError(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Authentication failed. Please try again.";
  }

  const messageByCode: Record<string, string> = {
    "auth/email-already-in-use": "An account already exists for this email.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/popup-closed-by-user": "Google sign-in was closed before it finished.",
    "auth/too-many-requests": "Too many attempts. Please wait and try again.",
    "auth/user-not-found": "No account exists for this email.",
    "auth/weak-password": "Use a password with at least 6 characters.",
    "auth/wrong-password": "Invalid email or password."
  };

  const code = Object.keys(messageByCode).find((key) => error.message.includes(key));
  return code ? messageByCode[code] : error.message;
}
