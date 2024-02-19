import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface Props {
  handleCloseModal: () => void;
}

export function JoinRoomModal({ handleCloseModal }: Props) {
  const route = useRouter();

  function handleOnSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const code = evt.currentTarget["code"].value;
    route.push("/chat/" + code);
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
          Ingresa el código de la sala a la que deseas ingresar.
        </span>
        <input
          name="code"
          className="border-[1px] bg-gray-300 border-gray-500 rounded-md py-1 px-2 text-gray-800 placeholder:text-gray-500 outline-none w-full"
          type="number"
          placeholder="Ingresa el código"
        />
        <button className="bg-blue-600 py-1 px-3 rounded-md text-white">
          Ingresar
        </button>
      </form>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40" />
    </div>
  );
}
