import React, { useState } from "react";
import { FiFile, FiFolder, FiFolderPlus } from "react-icons/fi";
import classNames from "classnames";
interface FileStructure {
  [key: string]: FileStructure | number;
}

interface FileItemProps {
  name: string;
  data: FileStructure | number;
  level: number;
  onFileClick: (filePath: string) => void;
  currentPath: string;
  selectedFile: string;
}
const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + " Bytes";
  if (bytes < 102400) return (bytes / 1024).toFixed(2) + " KB";
  if (bytes < 104857600) return (bytes / 1048576).toFixed(2) + " MB";
  return (bytes / 1073741824).toFixed(2) + " GB";
};


const FileItem: React.FC<FileItemProps> = ({
  name,
  data,
  level,
  onFileClick,
  currentPath,
  selectedFile,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const fullPath = `${currentPath}/${name}`;
  const isFile = typeof data === "number";
  const fileSize = isFile ? formatBytes(data) : "";
  const isActive = selectedFile === fullPath || selectedFile.startsWith(`${fullPath}/`);

  const marginLeft = `${level * 20}px`;

  const handleItemClick = () => {
    if (!isFile) handleClick();
    else onFileClick(fullPath);
  };

  const styleClasses = classNames(
    "flex flex-grow cursor-pointer rounded-md items-center gap-2 p-2 text-sm",
    {
      "bg-gray-900": isFile,
      "bg-gray-600 rounded-md": !isFile,
      "bg-sky-900": isActive && !isFile,
      "bg-sky-700": isActive && isFile,
    }
  );

  return (
    <div className="transition-all duration-200 ease-in-out">
      <div
        role="treeitem"
        aria-expanded={isFile ? undefined : isOpen}
        aria-selected={isActive}
        aria-label={name}
        style={{ marginLeft }}
        className={styleClasses}
        onClick={handleItemClick}
        tabIndex={0}
      >
        {isFile ? (
          <>
            <FiFile size={14} />
              <div className={"flex flex-grow justify-between"}>
                  <span>
                                        {name}

                  </span>
                    <div className={"text-xs"}>{fileSize}</div>
              </div>
          </>
        ) : <>{isOpen ? (
          <FiFolder size={14} />
        ) : (
          <FiFolderPlus size={14} />
        )} {name}</>}
      </div>
      <div
        role={isFile ? undefined : "group"}
        className={`gap-2 overflow-hidden pt-1 transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        {!isFile &&
          Object.keys(data).map((key) => (
            <FileItem
              key={key}
              name={key}
              data={data[key] | null}
              level={level + 1}
              onFileClick={onFileClick}
              currentPath={fullPath}
              selectedFile={selectedFile}
            />
          ))}
      </div>
    </div>
  );
};

export default FileItem;
// const FileItem: React.FC<FileItemProps> = ({
//   name,
//   data,
//   level,
//   onFileClick,
//   currentPath,
//   selectedFile,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//
//   const handleClick = () => setIsOpen(!isOpen);
//   const fullPath = `${currentPath}/${name}`;
//   const marginLeft = `${level * 20}px`;
//   const isFile = typeof data === "number";
//
//   const fileSize = data ? (data / 1024).toFixed(2) + " KB" : "";
//
//   const isActive =
//     selectedFile === fullPath || selectedFile.startsWith(`${fullPath}/`);
//
//   return (
//     <div className="transition-all duration-200 ease-in-out">
//       <div
//         role="treeitem"
//         aria-expanded={data ? isOpen : undefined}
//         aria-selected={isActive}
//         aria-label={name}
//         style={{ marginLeft }}
//         className={`flex flex-grow cursor-pointer items-center gap-2 p-2 text-sm ${
//           data ? "rounded-md bg-gray-600" : "bg-gray-900"
//         } ${
//           isActive
//             ? data
//               ? "rounded-md bg-sky-900"
//               : "rounded-md bg-sky-700"
//             : ""
//         }`}
//         onClick={data ? handleClick : () => onFileClick(fullPath)}
//         tabIndex={0}
//       >
//         {isFile ? (
//           <>
//             <FiFile size={14} />
//             {name} - {fileSize}
//           </>
//         ) : isOpen ? (
//           <FiFolder size={14} />
//         ) : (
//           <FiFolderPlus size={14} />
//         )}
//         {!isFile && name}
//       </div>
//       <div
//         role={data ? "group" : undefined}
//         className={`gap-2 overflow-hidden pt-1 transition-all duration-200 ease-in-out ${
//           isOpen ? "max-h-[400px]" : "max-h-0"
//         }`}
//       >
//         {data &&
//           Object.keys(data).map((key) => (
//             <FileItem
//               key={key}
//               name={key}
//               data={data[key]}
//               level={level + 1}
//               onFileClick={onFileClick}
//               currentPath={fullPath}
//               selectedFile={selectedFile}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };
//
// export default FileItem;
