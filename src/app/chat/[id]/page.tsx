"use client";

import { Chat } from "@/components/chat";
import { useGetChat } from "@/hooks/useChat";
import { StoreState } from "@/types/redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export default function Home() {
  const [, , remove] = useCookies();
  const { isAuth, isExpired } = useSelector((state: StoreState) => state.auth);
  const route = useRouter();
  const params = useParams();
  useGetChat(parseInt((params.id as string) || "0"));

  useEffect(() => {
    if (!isAuth) {
      route.push("/auth/login");
    }

    if (isExpired) {
      remove("accessToken");
    }
  }, []);

  return isAuth ? (
    <main className="w-full min-h-screen flex items-center justify-center px-2 ">
      <section className="flex-1 max-w-4xl pl-3">
        <Chat />
      </section>
    </main>
  ) : null;
}
