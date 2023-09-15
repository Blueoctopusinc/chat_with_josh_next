import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import SendIcon from "@/components/shared/SendIcon";
import { ChatMessage, useChatStore } from "@/stores/chatStore";

export interface ChatSuggestionButtonProps {
  text: string;
}

const ChatSuggestionButton: React.FC<ChatSuggestionButtonProps> = ({
  text,
}) => {
  const isChatOpen = useChatStore((state) => state.isChatOpen);
  const setIsChatOpen = useChatStore((state) => state.setIsChatOpen);
  const addMessage = useChatStore((state) => state.addMessage);

  const handleClick = () => {
    if (!isChatOpen) {
      setIsChatOpen(true);
    }
    // generate a uuid for the message
    const uuid = Math.random().toString(36).substring(7);
    addMessage({ id: uuid, message: text, role: "user" });
  };
  return (
    <button
      onClick={handleClick}
      className="h-18 group flex w-full justify-between gap-2 rounded-md border-2 border-gray-200 border-opacity-50 p-2 transition-all duration-300 ease-in-out hover:border-opacity-100 hover:shadow-lg"
    >
      <p className="my-auto w-full text-center text-base">&quot;{text}&quot;</p>
      <SendIcon />
    </button>
  );
};

export default ChatSuggestionButton;
