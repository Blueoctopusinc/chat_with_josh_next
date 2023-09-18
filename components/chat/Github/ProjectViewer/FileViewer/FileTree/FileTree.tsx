import React, { useContext } from "react";
import useFileViewerStore from "@/stores/fileViewerStore";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import FileItem from "@/components/chat/Github/ProjectViewer/FileViewer/FileTree/FileItem";
import { fetchFileStructure } from "@/utils/apiUtils.ts";
import { TabContext } from "@/hooks/stores/useInstanceTabStore";
import FileContent from "@/components/chat/Github/ProjectViewer/FileViewer/CodeViewer/FileContent";
import useFetchFileContent from "@/hooks/data_fetching/useFetchFileContent";
import FileStructure from "@/types/portfolio/FileStructure";
import useTabs from "@/hooks/useTabs";

const FileTree = ({ repo }) => {
  const queryClient = useQueryClient();
  const { addTab } = useTabs(); // Use the new addTab from useTabs

  // Try to get the cached data
  const cachedData: FileStructure = queryClient.getQueryData([
    "fileStructure",
    repo,
  ]);

  // Logging for debugging
  console.log("Cached Data: ", cachedData);

  const setSelectedFile = useFileViewerStore((state) => state.setSelectedFile);
  const selectedFile = useFileViewerStore((state) => state.selectedFile);
  const {
    data: fileData,
    isError: isFileError,
    isFetching: isFileFetching,
  } = useFetchFileContent(repo, selectedFile);
  const {
    data: fileStructure = cachedData,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(["fileStructure", repo], () => fetchFileStructure(repo), {
    // Disable query if we have the cached data
    enabled: !cachedData,
    // Use cached data as the initial data
    initialData: cachedData,
    // Set high values to keep data always fresh and in cache
    staleTime: 3600000,
    cacheTime: 3600000,
  });
  // Exception handling and logging
  if (isError) {
    console.error("Error loading file tree");
  }
  const handleFileClick = (file) => {
    setSelectedFile(file);

    // If it's mobile, open a new tab with the file content
    if (window.innerWidth < 768) {
      addTab({
        tabId: Math.random(), // Generate a random ID for the new tab
        tabName: selectedFile,
        tabContent: (
          <div className="relative flex w-full flex-grow flex-col overflow-hidden rounded-md bg-gray-800">
            <FileContent
              content={fileData.content}
              maxLineChars={fileData.content.length.toString().length}
              language={fileData.language}
            />
          </div>
        ),
        permanent: false, // Assuming the tab is not permanent
      });
    }
  };

  return (
    <div
      className="flex h-full w-full min-w-fit flex-col overflow-y-auto rounded-md bg-gray-900 p-4 text-sm md:w-1/3"
      role="tree"
      aria-label="File Tree"
    >
      {isLoading && <div className="text-white">Loading...</div>}
      {isSuccess &&
        Object.keys(fileStructure).map((key) => (
          <FileItem
            key={key}
            name={key}
            data={fileStructure[key]}
            level={0}
            onFileClick={handleFileClick}
            selectedFile={selectedFile}
            currentPath=""
          />
        ))}
      {isError && <div className="text-white">Error loading file tree.</div>}
    </div>
  );
};

export default FileTree;
