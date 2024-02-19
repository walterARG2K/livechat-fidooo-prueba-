"use client";
import { ChatField } from "@/ui/fields";
import { MessageEl, MessageElSkeleton } from "./message";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/types/redux";
import { sendMessage } from "@/services/chatService";
import { FormatDate } from "@/utils/formatDate";
import { Skeleton } from "../skeleton";

interface SendMessageProps {
  scrollEnd: boolean;
}

interface ChatMessagesProps {
  handleSetScrollEnd: (scrollEnd: boolean) => void;
}

export function Chat(): React.ReactNode {
  const [scrollEnd, setScrollEnd] = useState<boolean>(true);
  const { name, session } = useSelector((state: StoreState) => state.chat);

  function handleSetScrollEnd(isScrollEnd: boolean): void {
    setScrollEnd(isScrollEnd);
  }

  return (
    <div className="flex flex-col h-screen justify-center py-5">
      <div className="w-full max-w-4xl bg-white rounded-xl flex items-center px-7 py-[1.50rem] mb-[1rem]">
        <div className="flex flex-col overflow-hidden w-[75vw]">
          {name ? (
            <span className="overflow-hidden truncate">Chat: {name}</span>
          ) : (
            <Skeleton width={300} height={24} />
          )}
          {session ? (
            <span className="text-xs text-gray-400">
              Código de sesión: <strong>{session}</strong>
            </span>
          ) : (
            <Skeleton width={200} height={16} />
          )}
        </div>
      </div>
      <ChatMessages handleSetScrollEnd={handleSetScrollEnd} />
      <SendMessageEl scrollEnd={scrollEnd} />
    </div>
  );
}

function SendMessageEl({ scrollEnd }: SendMessageProps): React.ReactNode {
  const { id } = useSelector((state: StoreState) => state.chat);
  const { userData } = useSelector((state: StoreState) => state.auth);

  function handleOnSubmit(value: string) {
    if (id && userData?.uid && value.length) {
      console.log(userData);
      sendMessage(id, value, userData.uid, userData.name, userData.photo);
    }
  }

  return (
    <div
      className={`relative  left-0 right-0 bottom-0 bg-white p-4 rounded-md flex justify-center before:h-[1px] before:left-0 before:absolute before:right-0 before:top-0 before:bg-gradient-to-r before:from-transparent before:via-blue-500 before:to-transparent before:transition-opacity before:box-shadow-[0 0 10px 10px rgba(255, 255, 255, 0.5)] ${
        scrollEnd ? "before:opacity-0" : "before:opacity-100"
      } rounded-tr-none rounded-tl-none`}
    >
      <div className="w-full max-w-lg">
        <ChatField onSubmit={handleOnSubmit} />
      </div>
    </div>
  );
}

function ChatMessages({
  handleSetScrollEnd,
}: ChatMessagesProps): React.ReactNode {
  const { messages, session } = useSelector((state: StoreState) => state.chat);
  const { userData } = useSelector((state: StoreState) => state.auth);

  function handleOnScroll(evt: React.UIEvent<HTMLDivElement>): void {
    const scrollTop = evt.currentTarget.scrollTop;

    if (Math.abs(scrollTop) - 10 < 0) {
      handleSetScrollEnd(true);
    } else {
      handleSetScrollEnd(false);
    }
  }

  return (
    <div
      onScroll={handleOnScroll}
      className="w-full h-screen max-w-5xl bg-white rounded-xl  relative flex flex-col-reverse pt-3 px-6 gap-6 overflow-scroll scroll-smooth scrollbar-hide pb-3 rounded-br-none rounded-bl-none"
    >
      {!session ? (
        messages?.map((message, i) => {
          const itsTheSameDay =
            FormatDate(message.timestamp).day ==
            FormatDate(messages[i + 1]?.timestamp || 0).day;
          const itsTheFirstMessage = !(
            message.uid === messages[i + 1]?.uid && itsTheSameDay
          );
          const itsTheLastMessage = !(
            message.uid === messages[i - 1]?.uid &&
            FormatDate(message.timestamp).day ==
              FormatDate(messages[i - 1]?.timestamp || 0).day
          );

          return (
            <Fragment key={i}>
              <MessageEl
                time={message.timestamp}
                photo={itsTheLastMessage ? message?.photo! : ""}
                name={message.name || ""}
                showName={itsTheFirstMessage}
                received={message.uid != userData?.uid}
              >
                {message.text}
              </MessageEl>
              {!itsTheSameDay ? (
                <span className="self-center text-sm">
                  {FormatDate(message.timestamp).day}
                </span>
              ) : null}
            </Fragment>
          );
        })
      ) : (
        <>
          <MessageElSkeleton width={300} height={80} received />
          <MessageElSkeleton width={300} height={50} received={false} />
          <MessageElSkeleton width={200} height={50} received />
          <MessageElSkeleton width={350} height={30} received={false} />
          <MessageElSkeleton width={200} height={80} received />
          <MessageElSkeleton width={350} height={70} received={false} />
        </>
      )}
    </div>
  );
}
