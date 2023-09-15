import { useChatStore } from "@/stores/chatStore";
import Message from "@/components/chat/Messages/Message";
import useSSE from "@/hooks/useSSE";
import exampleProjects from "@/components/chat/Github/ProjectViewer/ExampleProjectsDev";
import GithubAction from "@/components/chat/Github/GithubAction";
import GitHubProject from "@/types/portfolio/GithubProject";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import ActionContainer from "@/components/chat/Action/ActionContainer";

const MessageLog: React.FC = () => {
  const ChatMessages = useChatStore((state) => state.chatMessages);
  const { messages, error } = useSSE("localhost:8000/api/message_inference");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mx-auto   flex w-[89%] flex-grow flex-col items-stretch bg-gray-700 p-4 shadow-dark-gray"
    >
      <div className="custom-scrollbar flex h-full  w-full flex-col gap-6  overflow-y-scroll px-2 pt-8">
        {ChatMessages.map((message, index) => (
          <Message key={index} type={message.role} content={message.message} />
        ))}
        <ActionContainer>
          {exampleProjects.map((project, index) => (
            <GithubAction key={index} project={project as GitHubProject} />
          ))}
        </ActionContainer>
      </div>
    </motion.div>
  );
};
export default MessageLog;
