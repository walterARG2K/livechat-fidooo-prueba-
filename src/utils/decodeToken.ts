import { FirebaseAuth } from "@/types/firebase";
import { jwtDecode } from "jwt-decode";

export function tokenDecode(token: string) {
  return jwtDecode<FirebaseAuth>(token);
}
