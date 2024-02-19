import { AuthState } from "@/redux/slices/auth.slice";
import { ChatState } from "@/redux/slices/chat.slice";

export interface StoreState {
  auth: AuthState;
  chat: ChatState;
}
