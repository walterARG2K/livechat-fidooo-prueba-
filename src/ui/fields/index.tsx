"use client";

import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { SendIcon } from "../icons";
import { poppins } from "../typography/fonts";

interface Props {
  children: string;
  icon: ReactElement;
  placeholder: string;
  type: "text" | "password";
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  error?: string;
}

interface ChatProps {
  onSubmit: (value: string) => void;
}

export function PrimaryField({
  children,
  icon,
  placeholder,
  type,
  onChange,
  value,
  name,
  error,
}: Props) {
  const [blur, setBlur] = useState<boolean>(true);

  function handleAddBlur() {
    setBlur(true);
  }
  function handleRemoveBlur() {
    setBlur(false);
  }

  return (
    <label
      className={`${poppins.className} w-full flex flex-col gap-1 relative`}
      htmlFor=""
    >
      <span className="text-sm">{children}</span>
      <input
        className={`bg-gray-100 outline-none w-full h-10 rounded-lg pl-2 pr-10 ${
          error ? "border-[1px] border-red-500" : ""
        }`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value || ""}
        name={name}
        autoComplete="off"
        onBlur={handleAddBlur}
        onFocus={handleRemoveBlur}
      />
      <div
        className={`absolute right-0 bottom-0 w-10 h-10 bg-[var(--primary-color)] rounded-lg grid place-content-center ${
          error ? "border-[1px] border-red-500 border-l-0" : ""
        }`}
      >
        {icon}
      </div>
      {!blur && error && (
        <span className="absolute bg-red-500 rounded-md p-1 top-[-20px] right-[6px] text-white text-xs after:absolute after:w-0 after:h-0 after:border-l-[6px] after:border-r-[6px] after:border-l-transparent after:border-r-transparent after:border-t-[6px] after:border-t-red-500 after:bottom-[-6px] after:right-[6px]">
          {error}
        </span>
      )}
    </label>
  );
}

export function ChatField({ onSubmit }: ChatProps) {
  const [value, setValue] = useState("");

  function handleOnChange(evt: ChangeEvent<HTMLInputElement>) {
    setValue(evt.currentTarget.value);
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setValue("");
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <input
        onChange={handleOnChange}
        value={value}
        className="w-full h-12 bg-transparent border-[1px] border-gray-500 rounded-md outline-none text-sm px-4 pr-12"
        type="text"
        placeholder="Escribe un mensaje..."
      />
      <button className="absolute top-[6px] right-[6px] w-9 h-9 bg-[var(--primary-color)] rounded-md grid place-content-center cursor-pointer">
        <SendIcon />
      </button>
    </form>
  );
}
