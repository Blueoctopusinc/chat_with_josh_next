import React, { useState } from "react";
import { FiFile, FiFolder, FiFolderPlus } from "react-icons/fi";
interface FileStructure {
  [key: string]: FileStructure | null;
}

interface FileItemProps {
  name: string;
  data: FileStructure | null;
  level: number;
  onFileClick: (filePath: string) => void;
  currentPath: string;
  selectedFile: string;
}
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
  const marginLeft = `${level * 20}px`;
  const isActive =
    selectedFile === fullPath || selectedFile.startsWith(`${fullPath}/`);

  return (
    <div className="transition-all duration-200 ease-in-out">
      <div
        role="treeitem"
        aria-expanded={data ? isOpen : undefined}
        aria-selected={isActive}
        aria-label={name}
        style={{ marginLeft }}
        className={`flex flex-grow cursor-pointer items-center gap-2 p-2 text-sm ${
          data ? "rounded-md bg-gray-600" : "bg-gray-900"
        } ${
          isActive
            ? data
              ? "rounded-md bg-sky-900"
              : "rounded-md bg-sky-700"
            : ""
        }`}
        onClick={data ? handleClick : () => onFileClick(fullPath)}
        tabIndex={0}
      >
        {data ? (
          isOpen ? (
            <FiFolder size={14} />
          ) : (
            <FiFolderPlus size={14} />
          )
        ) : (
          <FiFile size={14} />
        )}
        {name}
      </div>
      <div
        role={data ? "group" : undefined}
        className={`gap-2 overflow-hidden pt-1 transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        {data &&
          Object.keys(data).map((key) => (
            <FileItem
              key={key}
              name={key}
              data={data[key]}
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
