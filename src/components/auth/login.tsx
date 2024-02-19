"use client";

import { useForm } from "@/hooks/useForm";
import { addUser } from "@/redux/slices/auth.slice";
import { login } from "@/services/authService";
import { ILoginForm } from "@/types/auth";
import { PrimaryButton, SecondaryButton } from "@/ui/buttons";
import { PrimaryField } from "@/ui/fields";
import { EmailIcon, PasswordIcon } from "@/ui/icons";
import { ErrorMessage } from "@/ui/messages";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

export function LoginForm() {
  const { form, errors, handleChange } = useForm(validateForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const route = useRouter();

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (loading) return;

    const isValid = Object.keys(validateForm(form)).length;
    if (isValid === 0) {
      setLoading(true);
      const response = await login(form.email, form.password);

      if (response.user) {
        dispatch(
          addUser({
            isAuth: true,
            email: response.user.email,
            name: response.user.displayName,
            uid: response.user.uid,
            accessToken: response.user.accessToken,
            photo: response.user.photoURL,
          })
        );
        route.push("/");
      } else {
        setLoading(false);
        setErrorMessage(response.error);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs flex flex-col items-center px-3 mt-16 mx-auto gap-3"
    >
      {errorMessage && (
        <ErrorMessage onClick={() => setErrorMessage("")}>
          {errorMessage}
        </ErrorMessage>
      )}
      <div className="w-full flex flex-col gap-6">
        <PrimaryField
          name="email"
          onChange={handleChange}
          value={form.email}
          error={errors.email}
          type="text"
          placeholder="john@doe.com"
          icon={<EmailIcon />}
        >
          Correo electrónico
        </PrimaryField>
        <PrimaryField
          name="password"
          onChange={handleChange}
          value={form.password}
          error={errors.password}
          type="password"
          placeholder="12345678"
          icon={<PasswordIcon />}
        >
          Contraseña
        </PrimaryField>
      </div>
      <Link
        href={"/auth/password"}
        className="text-sm self-end underline-offset-2 underline text-[var(--primary-color)]"
      >
        olvidaste tu contraseña?
      </Link>
      <div className="w-full mt-10 relative">
        <PrimaryButton type="submit" loading={loading}>
          Iniciar Sesión
        </PrimaryButton>
        <div className="relative flex items-center justify-between">
          <hr className="my-9 border-none w-5/12 h-[1px] bg-black opacity-30" />
          <span className="opacity-40">O</span>
          <hr className="my-9 border-none w-5/12 h-[1px] bg-black opacity-30" />
        </div>
        <SecondaryButton
          onClick={() => route.push("/auth/signup")}
          loading={false}
        >
          Crear una Cuenta
        </SecondaryButton>
      </div>
    </form>
  );
}

function validateForm(form: ILoginForm) {
  let errors: { [key: string]: string } = {};
  const regexEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

  if (typeof form.email === "string" && !form.email.trim()) {
    errors["email"] = "Por favor, ingrese un email";
  } else if (typeof form.email === "string" && !regexEmail.test(form.email)) {
    errors["email"] = "Debe ingresar un email válido";
  }

  if (typeof form.password === "string" && !form.password) {
    errors["password"] = "Por favor, ingrese una contraseña";
  } else if (typeof form.password === "string" && form.password.length < 8) {
    errors["password"] = "Debe ingresar una contraseña más extensa";
  }

  if (!form.email?.trim() || !form.password?.trim()) {
    errors["send"] = "";
  }

  return errors;
}
