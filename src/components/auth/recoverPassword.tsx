"use client";

import { PrimaryButton, SecondaryButton } from "@/ui/buttons";
import { PrimaryField } from "@/ui/fields";
import { EmailIcon } from "@/ui/icons";
import { ISignUpForm } from "@/types/auth";
import { useForm } from "@/hooks/useForm";
import { FormEvent, useState } from "react";
import { recoverPassword } from "@/services/authService";
import { useRouter } from "next/navigation";
import { ErrorMessage, SuccessMessage } from "@/ui/messages";

export function RecoverPassword() {
  const { form, errors, handleChange } = useForm(validateForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const route = useRouter();

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (loading) return;

    const isValid = Object.keys(validateForm(form)).length;
    if (isValid === 0) {
      setLoading(true);
      const response = await recoverPassword(form.email);
      setLoading(false);
      if (response.success) {
        setSuccessMessage(response.success);
      } else {
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
      {successMessage && (
        <SuccessMessage onClick={() => setSuccessMessage("")}>
          {successMessage}
        </SuccessMessage>
      )}
      <div className="w-full flex flex-col gap-6">
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
      </div>
      <div className="w-full mt-10 relative">
        <PrimaryButton type="submit" loading={loading}>
          Recuperar contraseña
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
  const regexEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

  if (typeof form.email === "string" && !form.email.trim()) {
    errors["email"] = "Por favor, ingrese un email";
  } else if (typeof form.email === "string" && !regexEmail.test(form.email)) {
    errors["email"] = "Debe ingresar un email válido";
  }

  if (!form.email?.trim()) {
    errors["send"] = "";
  }

  return errors;
}
