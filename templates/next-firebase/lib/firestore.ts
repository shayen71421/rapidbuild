import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  updatedAt?: unknown;
}

export async function upsertUserProfile(profile: UserProfile) {
  const db = getFirebaseDb();
  await setDoc(
    doc(db, "users", profile.uid),
    {
      ...profile,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function getUserProfile(uid: string) {
  const db = getFirebaseDb();
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}

export async function createProject(ownerId: string, name: string) {
  const db = getFirebaseDb();
  return addDoc(collection(db, "projects"), {
    name,
    ownerId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function listUserProjects(ownerId: string) {
  const db = getFirebaseDb();
  const snapshot = await getDocs(query(collection(db, "projects"), where("ownerId", "==", ownerId)));
  return snapshot.docs.map((project) => ({ id: project.id, ...project.data() }));
}
