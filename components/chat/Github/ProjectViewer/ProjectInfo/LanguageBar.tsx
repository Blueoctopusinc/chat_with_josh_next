import colorData from "@/data/colors.json";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageBarProps {
  languages: {
    [key: string]: number;
  };
  className?: string;
}

const LanguageBar: React.FC<LanguageBarProps> = ({ languages, className }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const totalBytes = Object.values(languages).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  useEffect(() => {
    if (shouldAnimate) {
      setShouldAnimate(false);
    }
  }, []);

  return (
    <AnimatePresence>
      <div
        className={`min-h-5 flex overflow-hidden rounded-md drop-shadow-lg ${className}`}
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
      </div>
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
