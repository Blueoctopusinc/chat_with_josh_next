import { motion } from "framer-motion";
import React from "react";
import ActionContainer, {
  actions,
} from "@/components/chat/Action/ActionContainer";
import Action from "@/components/chat/Action/Action";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useChatStore } from "@/stores/chatStore";
import { id } from "postcss-selector-parser";
const StartScreenContent = () => {
  const { setIsChatOpen, addMessage } = useChatStore((state) => state);
  const handleActionClick = (action: string) => {
    setIsChatOpen(true);
    addMessage({ id: "1", role: "user", message: action });
  };
  return (
    <div className="    flex h-full w-full max-w-6xl flex-col items-center justify-center gap-2 overflow-y-scroll px-0 pb-24 pt-20 text-center sm:mt-0  sm:px-2 md:px-8 md:pb-0 md:pt-0 md:pt-0 lg:px-0">
      <h1 className=" pt-28 text-2xl text-gray-400 md:pt-0">
        Interactive CV/Portfolio{" "}
      </h1>
      <p className="p-2 text-base leading-relaxed text-gray-300 lg:w-10/12">
        This is a custom self-hosted chatbot on Google Cloud that utilizes
        OpenAI's chat models to act as AI agents. Capable of performing
        retrieval augmented generation on my GitHub profile and CV, it allows
        you to engage in a natural language conversation with 'me' as a
        professional. I've also loaded it with some information you won't find
        on my DV! Discover my hobbies, where I'm currently based, and the roles
        I would be open to exploring. Feel free to interact and explore!{" "}
      </p>
      <ActionContainer>
        {actions.map((action, index) => (
          <Action
            key={index}
            onClick={() => handleActionClick(action.text)}
            icon={
              <BsQuestionCircleFill className="ml-auto h-full " size={20} />
            }
          >
            {action.text}
          </Action>
        ))}
      </ActionContainer>
    </div>
  );
};

const StartScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="hide-scrollbar relative mx-auto flex h-screen-minus-header max-h-full w-[89%] flex-col items-center justify-center overflow-y-scroll overflow-y-scroll bg-gray-700 p-4"
    >
      <StartScreenContent />
    </motion.div>
  );
};

export default StartScreen;
