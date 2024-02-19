import { GenericObject } from "@/types";
import { ChangeEvent, useState } from "react";

type ValidateForm = (form: GenericObject) => GenericObject;

export function useForm(validateForm: ValidateForm) {
  const [form, setForm] = useState<GenericObject>({});
  const [errors, setErrors] = useState<GenericObject>({});

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.currentTarget;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setErrors(validateForm(updatedForm));
  }

  return {
    form,
    errors,
    handleChange,
  };
}
