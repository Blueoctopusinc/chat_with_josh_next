import { RiSendPlane2Fill } from "react-icons/ri";
import React from "react";
import classNames from "classnames";
interface SendIconProps {
  variant?: "default" | "white";
}

const SendIcon: React.FC<SendIconProps> = ({ variant = "default" }) => {
  const classes = classNames({
    "my-auto h-6 w-6 transform text-gray-500 transition-colors transition-transform  duration-300 duration-300 ease-in-out ease-in-out group-hover:scale-105 group-hover:text-sky-700":
      variant === "default",
    "my-auto h-6 w-6 transform text-gray-500 transition-colors transition-transform  duration-300 duration-300 ease-in-out ease-in-out group-hover:scale-105 group-hover:text-white":
      variant === "white",
  });

  return <RiSendPlane2Fill className={classes} />;
};

export default SendIcon;
