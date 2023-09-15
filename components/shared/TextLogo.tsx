import React from "react";
import classNames from "classnames";

interface TextLogoProps {
  className?: string;
}

const TextLogo: React.FC<TextLogoProps> = ({ className }) => {
  const finalClassName = classNames(
    "text-gray-400 text-4xl font-bold",
    className || "",
  );

  return (
    <h1 className={finalClassName}>
      Chat<span className="text-sky-700 shadow-lg">JYG</span>
    </h1>
  );
};

export default TextLogo;
