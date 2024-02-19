"use client";

import { SignUpForm } from "@/components/auth/signup";
import { StoreState } from "@/types/redux";
import { TitleText } from "@/ui/typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SignUpPage() {
  const user = useSelector((state: StoreState) => state.auth);
  const route = useRouter();

  useEffect(() => {
    if (user?.isAuth) {
      route.push("/");
    }
  }, []);

  return !user.isAuth ? (
    <main className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <picture className="max-w-64 max-h-24 relative w-screen h-screen inline-block">
          <Image
            className="object-none"
            loading="lazy"
            fill
            src={"/logo.webp"}
            alt="brand logo"
          />
        </picture>
      </div>
      <section className="w-full flex flex-col items-center">
        <TitleText>Crea una Nueva Cuenta.</TitleText>
        <SignUpForm />
      </section>
    </main>
  ) : null;
}
