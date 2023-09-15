import React, { FC, MouseEventHandler } from "react";
import SendIcon from "@/components/shared/SendIcon"; // Assuming SendIcon is properly typed

interface SendButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const SendButton: FC<SendButtonProps> = ({ onClick }) => (
  <button
    className="group rounded-r-lg bg-gray-800 px-4 transition-colors duration-300 ease-in-out hover:bg-sky-700"
    onClick={onClick}
    aria-label="Send Message"
  >
    <SendIcon variant={"white"} />
  </button>
);

export default SendButton;
