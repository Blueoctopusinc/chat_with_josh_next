"use client";
import React, { useState } from "react";
import SendIcon from "@/components/shared/SendIcon";
import { AnimatePresence, motion } from "framer-motion";
import TextArea from "@/components/chat/ChatInput/TextArea";
import SendButton from "@/components/chat/ChatInput/SendButton";
import Disclaimer from "@/components/chat/ChatInput/Disclaimer";

const ChatInput: React.FC = () => {
  // Get the showDisclaimer state from local storage

  const [message, setMessage] = useState(""); // State for the input field

  const handleInputChange = (e) => setMessage(e.target.value);

  const handleSendClick = () => {
    // Logic to send the message
    console.log(message);
    setMessage(""); // Clear the input field
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the Enter key from creating a new line
      handleSendClick();
    }
  };
  return (
    <div className="  z-40 -mt-2 flex w-full rounded-t-xl bg-gray-900 p-2 shadow-dark-gray lg:mx-auto lg:w-11/12">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-2 text-center">
        <div className="flex w-full rounded-lg rounded-l-lg bg-gray-600">
          <TextArea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <SendButton onClick={handleSendClick} />
        </div>

        <Disclaimer />
      </div>
    </div>
  );
};

export default ChatInput;
