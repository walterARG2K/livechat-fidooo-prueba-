import { poppins } from "./fonts";

interface Props {
  children: string | React.ReactNode;
}

export function TitleText({ children }: Props) {
  return (
    <h1 className={`${poppins.className} text-lg font-semibold`}>{children}</h1>
  );
}

export function TitleVariantText({ children }: Props) {
  return (
    <h1
      className={`${poppins.className} text-3xl font-bold max-[480px]:text-xl`}
    >
      {children}
    </h1>
  );
}
