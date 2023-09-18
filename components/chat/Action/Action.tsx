import React from "react";
import classNames from "classnames";

interface ActionProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Action: React.FC<ActionProps> = ({
  children,
  icon,
  className,
  onClick,
}) => {
  const classes = classNames(
    "flex flex-row gap-2 text-white font-semibold w-full rounded-md pl-2 bg-gray-800 text-sm",
    "group hover:bg-gray-900 overflow-hidden  transition-colors duration-300 ease-in-out",
    "cursor-pointer",
    className ? className : "",
  );

  return (
    <div className="group">
      <button className={classes} onClick={onClick}>
        <div className={"my-auto flex-grow text-xs"}>{children}</div>
        {icon ? (
          <div
            className={classNames(
              "min-h-full  bg-sky-700 p-5 text-sky-200 transition-colors duration-300 ease-in-out",
              "group-hover:bg-sky-800 group-hover:text-white",
            )}
          >
            {icon}
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default Action;
