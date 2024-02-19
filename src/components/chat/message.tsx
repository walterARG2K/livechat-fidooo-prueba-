import { ChatBubbleTailIcon } from "@/ui/icons";
import { FormatDate } from "@/utils/formatDate";
import { getRandomTailwindColor } from "@/utils/randomColor";
import { useRef } from "react";

interface Props {
  received: boolean;
  children: string;
  name: string;
  showName: boolean;
  photo: string;
  time: { seconds: number; nanoseconds: number };
}

export function MessageEl({
  received,
  children,
  name,
  showName,
  photo,
  time,
}: Props) {
  const colorRef = useRef(getRandomTailwindColor());

  return (
    <div
      className={`w-fit max-w-full text-white ${
        received
          ? "bg-[var(--background-chat-received)] rounded-bl-none ml-9"
          : "bg-[var(--background-chat-sended)] rounded-br-none self-end"
      } px-3 rounded-lg py-2 relative text-sm break-words whitespace-pre-wrap flex flex-col`}
      style={{ wordBreak: "break-word" }}
    >
      {received && photo && (
        <div className="w-8 h-8 absolute left-[-35px] rounded-full bottom-0">
          <img className="rounded-full" src={photo} alt="" />
        </div>
      )}
      {showName && received ? (
        <span className={`text-sm ${colorRef.current}`}>{name}</span>
      ) : null}
      {children}
      <span
        className={`relative bottom-[-5px] ${
          received ? "left-[-5px]" : "right-[-5px]"
        } block text-xs opacity-50 ${received ? "" : "self-end"}`}
      >
        {FormatDate(time).hour}
      </span>
      <span
        className={`absolute ${
          received ? "left-[-6px] -scale-x-100" : "right-[-6px]"
        } bottom-0`}
      >
        <ChatBubbleTailIcon
          color={
            received
              ? "var(--background-chat-received)"
              : "var(--background-chat-sended)"
          }
        />
      </span>
    </div>
  );
}

interface SkeletonProps {
  received: boolean;
  width: number;
  height: number;
}

export function MessageElSkeleton({ received, width, height }: SkeletonProps) {
  return (
    <div
      className={`w-5/6 animate-pulse bg-gray-300 text-white ${
        received ? "rounded-bl-none ml-9" : " rounded-br-none self-end"
      } px-3 rounded-lg py-2 relative text-sm break-words whitespace-pre-wrap flex flex-col`}
      style={{ wordBreak: "break-word", maxWidth: width, height }}
    >
      {received && (
        <div className="w-8 h-8 absolute left-[-35px] bg-gray-300 rounded-full bottom-0" />
      )}
      <span
        className={`absolute ${
          received ? "left-[-6px] -scale-x-100" : "right-[-6px]"
        } bottom-0`}
      >
        <ChatBubbleTailIcon color={"#d8dbe0"} />
      </span>
    </div>
  );
}
