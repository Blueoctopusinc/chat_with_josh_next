"use client";
import { IoIosPhonePortrait } from "react-icons/io"; // For the touch icon
import { Fragment, useEffect, useState } from "react";
import { PiControlBold } from "react-icons/pi";

const ControlKey = ({ commandKeys }) => {
  const [isMac, setIsMac] = useState(false);
  const [isWindowsOrLinux, setIsWindowsOrLinux] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMac(window.navigator.platform.toUpperCase().indexOf("MAC") >= 0);
    setIsWindowsOrLinux(
      window.navigator.platform.toUpperCase().indexOf("WIN") >= 0 ||
        window.navigator.platform.toUpperCase().indexOf("LINUX") >= 0,
    );
    setIsMobile(/Mobi|Android/i.test(window.navigator.userAgent));
  }, []);
  return (
    <div className="flex items-center gap-1 p-1 text-sm font-bold text-gray-100 opacity-80">
      {isMobile ? (
        <IoIosPhonePortrait size={20} />
      ) : isMac ? (
        <PiControlBold size={20} />
      ) : (
        "CTRL"
      )}
      {commandKeys &&
        !isMobile &&
        commandKeys.map((key, index) => (
          <Fragment key={index}>
            <p>+</p>
            <p>{key}</p>
          </Fragment>
        ))}
    </div>
  );
};

export default ControlKey;
