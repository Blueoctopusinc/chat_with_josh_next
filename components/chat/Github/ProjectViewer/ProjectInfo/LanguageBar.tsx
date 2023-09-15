import colorData from "@/data/colors.json";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageBarProps {
  languages: {
    [key: string]: number;
  };
}

const LanguageBar: React.FC<LanguageBarProps> = ({ languages }) => {
  const totalBytes = Object.values(languages).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-5 flex overflow-hidden rounded-md drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ scaleX: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 45,
        }}
      >
        {Object.keys(languages).map((lang, index) => {
          const percentage = ((languages[lang] / totalBytes) * 100).toFixed(2);
          return (
            <LanguageBarItem
              language={lang}
              percentage={percentage}
              key={index}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

const LanguageBarItem: React.FC<{ language: string; percentage: string }> = ({
  language,
  percentage,
}) => {
  return (
    <div
      className="flex h-5 items-center justify-center"
      style={{
        flexBasis: `${percentage}%`,
        backgroundColor: colorData[language].color,
      }}
    >
      <span className="p-2 text-xs font-bold text-white">{language}</span>
    </div>
  );
};

export default LanguageBar;
