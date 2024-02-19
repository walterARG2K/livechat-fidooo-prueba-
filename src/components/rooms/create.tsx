import { newChat } from "@/services/chatService";
import { StoreState } from "@/types/redux";
import { Loader } from "@/ui/buttons";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  handleCloseModal: () => void;
}

export function CreateRoomModal({ handleCloseModal }: Props) {
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useSelector((state: StoreState) => state.auth);

  async function handleOnSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const roomName = evt.currentTarget["room"].value;
    if (loading || !roomName) return;
    setLoading(true);
    const session = await newChat(roomName, userData?.uid || "");
    if (typeof session === "number" && session) {
      route.push("/chat/" + session);
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 grid place-content-center">
      <form
        onSubmit={handleOnSubmit}
        className="w-screen max-w-60 h-52 bg-white relative z-10 rounded-md text-center p-3 flex flex-col items-center justify-center gap-3 pt-9"
      >
        <button
          onClick={handleCloseModal}
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <span className="text-sm text-gray-700">
          Ingresa el nombre para tu nueva sala.
        </span>
        <input
          name="room"
          className="border-[1px] bg-gray-300 border-gray-500 rounded-md py-1 px-2 text-gray-800 placeholder:text-gray-400 outline-none w-full"
          type="text"
          placeholder="La mejor sala del mundo..."
        />
        <button className="bg-blue-600 rounded-md text-white relative h-8 w-32">
          {loading ? <Loader /> : "Crear Chat"}
        </button>
      </form>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40" />
    </div>
  );
}
