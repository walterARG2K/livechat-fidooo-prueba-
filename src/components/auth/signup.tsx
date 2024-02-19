"use client";

import { PrimaryButton, SecondaryButton } from "@/ui/buttons";
import { PrimaryField } from "@/ui/fields";
import { EmailIcon, PasswordIcon, UserIcon } from "@/ui/icons";
import { ISignUpForm } from "@/types/auth";
import { useForm } from "@/hooks/useForm";
import { FormEvent, useState } from "react";
import { signUp } from "@/services/authService";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/ui/messages";

export function SignUpForm() {
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
      const response = await signUp(form.name, form.email, form.password);
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
      className="w-full max-w-xs flex flex-col items-center px-3 mt-12 mx-auto gap-3 py-4"
    >
      {errorMessage && (
        <ErrorMessage onClick={() => setErrorMessage("")}>
          {errorMessage}
        </ErrorMessage>
      )}
      <div className="w-full flex flex-col gap-6">
        <PrimaryField
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="john doe"
          icon={<UserIcon />}
          error={errors.name}
        >
          Nombre
        </PrimaryField>
        <PrimaryField
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
          placeholder="john@doe.com"
          icon={<EmailIcon />}
          error={errors.email}
        >
          Email
        </PrimaryField>
        <PrimaryField
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="12345678"
          icon={<PasswordIcon />}
          error={errors.password}
        >
          Contraseña
        </PrimaryField>
        <PrimaryField
          name="repeatPassword"
          type="password"
          value={form.repeatPassword}
          onChange={handleChange}
          placeholder="12345678"
          icon={<PasswordIcon />}
          error={errors.repeatPassword}
        >
          Confirmar contraseña
        </PrimaryField>
      </div>
      <div className="w-full mt-10 relative">
        <PrimaryButton type="submit" loading={loading}>
          Crear Cuenta
        </PrimaryButton>
        <div className="relative flex items-center justify-between">
          <hr className="my-9 border-none w-5/12 h-[1px] bg-black opacity-30" />
          <span className="opacity-40">O</span>
          <hr className="my-9 border-none w-5/12 h-[1px] bg-black opacity-30" />
        </div>
        <SecondaryButton
          onClick={() => route.push("/auth/login")}
          loading={false}
        >
          Iniciar Sesión
        </SecondaryButton>
      </div>
    </form>
  );
}

function validateForm(form: ISignUpForm) {
  let errors: { [key: string]: string } = {};
  const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/u;
  const regexEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

  if (typeof form.name === "string" && !form.name?.trim()) {
    errors["name"] = "Por favor, ingrese un nombre";
  } else if (typeof form.name === "string" && !regexName.test(form.name)) {
    errors["name"] = "El campo 'Nombre' solo puede contener letras";
  }

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

  if (typeof form.repeatPassword === "string" && !form.repeatPassword) {
    errors["repeatPassword"] = "Por favor, repita su contraseña";
  } else if (
    typeof form.repeatPassword === "string" &&
    form.repeatPassword != form.password
  ) {
    errors["repeatPassword"] = "Las contraseñas no coinciden";
  }

  if (
    !form.email?.trim() ||
    !form.name?.trim() ||
    !form.password?.trim() ||
    !form.repeatPassword?.trim()
  ) {
    errors["send"] = "";
  }

  return errors;
}
