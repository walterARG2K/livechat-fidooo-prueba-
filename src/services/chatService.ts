import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function getChatMessages(
  chatNumber: number,
  handleNewData: ({}: any) => void
) {
  const chatRef = collection(db, "chat");
  const q = await query(chatRef, where("session", "==", chatNumber));
  const querySnapshot = await getDocs(q);
  let chatFounded = {};
  let unSuscribe;
  querySnapshot.forEach((chat) => {
    if (!Object.keys(chatFounded).length) {
      unSuscribe = onSnapshot(doc(db, "chat", chat.id), (doc) => {
        chatFounded = doc.data() || chat.data();
        handleNewData({ ...chatFounded, id: chat.id });
      });
    }
  });

  return unSuscribe;
}

export async function sendMessage(
  chatId: string,
  text: string,
  uid: string,
  name: string,
  photo: string
) {
  const chatRef = await doc(db, "chat", chatId);
  const chat = await getDoc(chatRef);

  if (!chat || !text) return chat;

  setDoc(
    chatRef,
    {
      messages: [
        {
          text,
          timestamp: new Date(),
          uid,
          name,
          photo,
        },
        ...chat.data()?.messages,
      ],
    },
    { merge: true }
  );

  return chat;
}

export async function newChat(name: string, uid: string): Promise<number> {
  const randomCode = Math.ceil(Math.random() * (99999 - 10000) + 10000);

  const chatRef = collection(db, "chat");
  const docRef = await addDoc(chatRef, {
    messages: [],
    name,
    session: randomCode,
    uid,
  });

  const chat = (await getDoc(docRef)).data();
  if (chat) {
    return chat.session as number;
  } else {
    return 0;
  }
}
