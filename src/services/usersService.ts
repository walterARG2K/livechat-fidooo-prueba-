import { db } from "@/config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export async function AddUser(name: string, email: string, uid: string) {
  const usersRef = collection(db, "users");
  const q = await query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const empty = querySnapshot.empty;

  if (empty) {
    return await addDoc(usersRef, {
      name,
      email,
      uid,
    });
  }
  return null;
}
