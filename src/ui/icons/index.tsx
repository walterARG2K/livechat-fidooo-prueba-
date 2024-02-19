import Image from "next/image";
import passwordIconSVG from "./password.svg";
import emailIconSVG from "./email.svg";
import userIconSVG from "./user.svg";
import searchIconSVG from "./search.svg";
import sendIconSVG from "./send.svg";
import chatBubbleTailIconSVG from "./chat-bubble-tail.svg";

interface Props {
  color?: string;
}

export function PasswordIcon() {
  return (
    <Image width={18} height={20} src={passwordIconSVG} alt="password icon" />
  );
}

export function EmailIcon() {
  return <Image width={18} height={20} src={emailIconSVG} alt="email icon" />;
}

export function UserIcon() {
  return <Image width={24} height={24} src={userIconSVG} alt="user icon" />;
}

export function SearchIcon() {
  return <Image width={24} height={24} src={searchIconSVG} alt="search icon" />;
}

export function SendIcon() {
  return <Image width={24} height={24} src={sendIconSVG} alt="send icon" />;
}

export function ChatBubbleTailIcon({ color }: Props) {
  return (
    <svg
      width="7"
      height="17"
      viewBox="0 0 7 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 17H0V0C0.193 2.84 0.876 5.767 2.05 8.782C2.954 11.107 4.496 13.267 6.675 15.262C6.82379 15.398 6.92798 15.5759 6.97391 15.7722C7.01983 15.9685 7.00535 16.1741 6.93236 16.362C6.85938 16.55 6.73129 16.7114 6.5649 16.8253C6.39852 16.9391 6.20161 17 6 17Z"
        fill={color}
      />
    </svg>
  );
}
