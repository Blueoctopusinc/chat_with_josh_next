import { AiFillRobot, AiOutlineRobot } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GrRobot } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import classNames from "classnames";

type MessageProps = {
  type: string;
  content: string;
};
const parseLinks = (content: string) => {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return content.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; font-weight: bold;">$1</a>',
  );
};

const Message: React.FC<MessageProps> = ({ type, content }) => (
  <div
    className={classNames(
      "relative mb-2 flex w-fit  gap-2 rounded-lg px-4 py-4 drop-shadow-md",
      {
        "md:max-w-10/12  ml-4 flex-row-reverse bg-emerald-800": type === "user",
        "md:max-w-10/12 ml-auto mr-4 bg-sky-800": type === "system",
      },
    )}
  >
    <span
      className={classNames("my-auto ml-2 text-white", {
        "text-blue-900": type === "user",
        "text-green-900": type === "system",
      })}
      dangerouslySetInnerHTML={{ __html: parseLinks(content) }}
    />
    <span
      className={classNames(
        "max-w-10 absolute flex h-10 max-h-10 w-10 items-center justify-center rounded-full bg-gray-800 p-2 text-white",
        {
          "-left-4 -top-5 border-4 border-emerald-800": type === "user",
          "-right-4 -top-5 border-4 border-sky-800": type === "system",
        },
      )}
    >
      {type === "user" ? (
        <FaUser className="mx-auto my-auto" size={20} />
      ) : (
        <AiFillRobot className="mx-auto my-auto" color={"white"} size={20} />
      )}
    </span>
  </div>
);

export default Message;
