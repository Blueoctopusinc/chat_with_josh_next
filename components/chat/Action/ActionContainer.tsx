import ChatSuggestionButton from "@/components/chat/StartScreen/ChatSuggestionButton";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ActionContainerProps {
  children: React.ReactNode[];
}
const ActionContainer: React.FC<ActionContainerProps> = ({ children }) => {
  const [visibleChildren, setVisibleChildren] = useState<React.ReactNode[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    try {
      // Pre-render all children but keep them hidden
      setVisibleChildren(children);

      // Start the animation
      setAnimationStarted(true);
    } catch (error) {
      console.error("An error occurred during the setup: ", error);
    }
  }, [children]);

  return (
    <div className="mx-auto grid min-h-fit w-full w-full grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2">
      <AnimatePresence>
        {animationStarted &&
          visibleChildren.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.05 * index },
              }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.05 }}
            >
              {child}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
export const actions = [
  { text: "Do you have any projects?" },
  { text: "Where did you study?" },
  { text: "What technologies do you know?" },
  { text: "Where can I find your CV?" },
  { text: "What are your hobbies?" },
  { text: "Favourite programming language?" },
];

export default ActionContainer;
