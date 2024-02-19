import { TitleVariantText } from "@/ui/typography";
import { useState } from "react";
import { JoinRoomModal } from "./join";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@/types/redux";
import { useRouter } from "next/navigation";
import { CreateRoomModal } from "./create";
import { useCookies } from "react-cookie";
import { removeUser } from "@/redux/slices/auth.slice";

export function Rooms() {
  const [joinRoom, setJoinRoom] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const { userData } = useSelector((state: StoreState) => state.auth);
  const [, , remove] = useCookies();
  const dispatch = useDispatch();
  const router = useRouter();

  function handleSetJoinRoom() {
    setJoinRoom((prev) => !prev);
  }

  function handleSetCreateRoom() {
    setCreateRoom((prev) => !prev);
  }

  function handleGlobalChat() {
    router.push("/chat/999999");
  }

  function handleLogOut() {
    remove("accessToken", { path: "/" });
    dispatch(removeUser(""));
    router.push("/auth/login");
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {joinRoom && <JoinRoomModal handleCloseModal={handleSetJoinRoom} />}
      {createRoom && <CreateRoomModal handleCloseModal={handleSetCreateRoom} />}
      <TitleVariantText>
        Bienvenido a <span className="text-green-400">LiveChat</span>
      </TitleVariantText>
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full">
          <img className="rounded-full" src={userData?.photo} alt="" />
        </div>
        <span className="bg-green-400 text-white px-2 rounded-md">
          {userData?.name}
        </span>
        <button
          onClick={handleLogOut}
          className="bg-gray-400 text-white px-2 rounded-md py-1"
        >
          Cerrar sesión
        </button>
      </div>
      <hr className="w-full h-[1px] bg-gray-400 border-none" />
      <div className="flex flex-wrap gap-3 place-content-center max-w-md">
        <button
          onClick={handleSetJoinRoom}
          className="bg-blue-600 py-1 px-3 rounded-md text-white max-[480px]:text-sm"
        >
          Ingresar a un Chat
        </button>
        <button
          onClick={handleSetCreateRoom}
          className="border-[1px] border-blue-600 py-1 px-3 rounded-md max-[480px]:text-sm"
        >
          Crear un nuevo Chat
        </button>
        <button
          onClick={handleGlobalChat}
          className=" bg-green-500 py-1 px-3 rounded-md max-[480px]:text-sm grid-col text-white"
        >
          Ingresar al Chat Global
        </button>
      </div>
      <hr className="w-full h-[1px] bg-gray-400 border-none" />
    </div>
  );
}
