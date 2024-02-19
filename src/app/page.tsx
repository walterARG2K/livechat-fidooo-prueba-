"use client";
import { Rooms } from "@/components/rooms";
import { StoreState } from "@/types/redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export default function SelectRoom() {
  const [cookie, setCookie, remove] = useCookies();
  const { isAuth, accessToken, isExpired, userData } = useSelector(
    (state: StoreState) => state.auth
  );
  const route = useRouter();

  useEffect(() => {
    if (!cookie.accessToken) {
      route.push("/auth/login");
    }

    if (accessToken) {
      setCookie("accessToken", accessToken, { path: "/" });
      setCookie("photo", userData?.photo, { path: "/" });
      setCookie("name", userData?.name, { path: "/" });
    }

    if (isExpired) {
      remove("accessToken");
    }
  }, []);

  return isAuth ? (
    <main className="w-full min-h-screen flex items-center justify-center px-2 ">
      <section className="flex-1 max-w-4xl pl-3">
        <Rooms />
      </section>
    </main>
  ) : null;
}
