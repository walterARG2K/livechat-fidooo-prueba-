import { removeChat, setChat } from "@/redux/slices/chat.slice";
import { getChatMessages } from "@/services/chatService";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useGetChat(id: number) {
  const dispatch = useDispatch();

  useEffect(() => {
    let unSuscribe: any;

    const fetchData = async () =>
      (unSuscribe = await getChatMessages(id, (response) => {
        if (Object.keys(response).length) {
          dispatch(setChat(response));
        }
      }));

    fetchData();

    return () => {
      if (unSuscribe) {
        unSuscribe();
        dispatch(removeChat(""));
      }
    };
  }, []);
}
