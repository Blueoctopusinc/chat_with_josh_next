"use client";
import React from "react";
import { useChatStore } from "@/stores/chatStore";
import ChatInput from "@/components/chat/ChatInput/ChatInput";
import { motion, AnimatePresence } from "framer-motion";

const ChatWindow: React.FC = () => {
  const isChatOpen = useChatStore((state) => state.isChatOpen);
  // const isChatOpen = true;
  return (
    <div className="max-h-screen-minus-header relative   mx-auto  flex h-screen min-h-full w-full max-w-7xl flex-col">
      <AnimatePresence>
        {isChatOpen ? <MessageLog /> : <StartScreen />}
      </AnimatePresence>
      <ChatInput />
    </div>
  );
};

import classNames from "classnames";
import MessageLog from "@/components/chat/Messages/MessageLog";
import StartScreen from "@/components/chat/StartScreen/StartScreen";

type MessageProps = {
  type: "user" | "system";
  content: string;
};

const messages: MessageProps[] = [
  {
    type: "user",
    content:
      "Hi there! I stumbled across your website and I'm interested in the products you offer. Can you provide more information about the [latest gadgets](https://example.com/gadgets)?",
  },
  {
    type: "system",
    content:
      "Of course! Our latest gadgets include smartphones, smartwatches, and tablets. You can find detailed specifications and pricing [here](https://example.com/gadgets). Is there anything specific you would like to know?",
  },
  {
    type: "user",
    content:
      "Yes, I am particularly interested in the new [SmartWatch X](https://example.com/smartwatch-x). How does it compare to its previous version?",
  },
  {
    type: "system",
    content:
      "The SmartWatch X features a brighter display, longer battery life, and improved fitness tracking compared to its predecessor. You can view a side-by-side comparison [here](https://example.com/smartwatch-comparison).",
  },
  {
    type: "user",
    content: "That sounds great! What about the warranty and support?",
  },
  {
    type: "system",
    content:
      "All our products, including SmartWatch X, come with a one-year standard warranty. You can extend it by purchasing our [Premium Support Package](https://example.com/support). This package also includes 24/7 customer support.",
  },
  { type: "user", content: "Perfect, thank you for the detailed information!" },
  {
    type: "system",
    content:
      "You're welcome! If you have any more questions, feel free to ask. Happy shopping!",
  },
  {
    type: "system",
    content:
      "The SmartWatch X features a brighter display, longer battery life, and improved fitness tracking compared to its predecessor. You can view a side-by-side comparison [here](https://example.com/smartwatch-comparison).",
  },
  {
    type: "user",
    content: "That sounds great! What about the warranty and support?",
  },
  {
    type: "system",
    content:
      "All our products, including SmartWatch X, come with a one-year standard warranty. You can extend it by purchasing our [Premium Support Package](https://example.com/support). This package also includes 24/7 customer support.",
  },
  { type: "user", content: "Perfect, thank you for the detailed information!" },
  {
    type: "system",
    content:
      "You're welcome! If you have any more questions, feel free to ask. Happy shopping!",
  },
  {
    type: "system",
    content:
      "You're welcome! If you have any more questions, feel free to ask. Happy shopping!",
  },
  {
    type: "system",
    content:
      "The SmartWatch X features a brighter display, longer battery life, and improved fitness tracking compared to its predecessor. You can view a side-by-side comparison [here](https://example.com/smartwatch-comparison).",
  },
  {
    type: "user",
    content: "That sounds great! What about the warranty and support?",
  },
  {
    type: "system",
    content:
      "All our products, including SmartWatch X, come with a one-year standard warranty. You can extend it by purchasing our [Premium Support Package](https://example.com/support). This package also includes 24/7 customer support.",
  },
  { type: "user", content: "Perfect, thank you for the detailed information!" },
  {
    type: "system",
    content:
      "You're welcome! If you have any more questions, feel free to ask. Happy shopping!",
  },
];

export default ChatWindow;
