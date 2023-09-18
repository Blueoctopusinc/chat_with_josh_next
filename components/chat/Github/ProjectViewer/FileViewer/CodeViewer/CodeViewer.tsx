"use client";
import React, { useContext, useEffect } from "react";
import useFileViewerStore from "@/stores/fileViewerStore";
import { useQuery } from "react-query";
import axios from "axios";
import { Highlight, Prism, themes } from "prism-react-renderer";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import FileContent from "@/components/chat/Github/ProjectViewer/FileViewer/CodeViewer/FileContent";
import { TbDeviceTabletShare } from "react-icons/tb";
import { TabContext } from "@/hooks/stores/useInstanceTabStore";
import useTabs from "@/hooks/useTabs";

// File: CodeViewer.tsx

const CodeViewer: React.FC<{ githubRepoUrl: string }> = ({ githubRepoUrl }) => {
  const selectedFile = useFileViewerStore((state) => state.selectedFile);
  const { addTab, tabs } = useTabs();
  const currentMaxTabId = tabs.reduce(
    (max, tab) => Math.max(max, tab.tabId),
    0,
  );
  const fetchFileContent = async () => {
    if (!selectedFile) return null;
    const apiUrl = `http://localhost:8000/api/github_store/repo/${githubRepoUrl}/file/`;
    const response = await axios.post(apiUrl, { path: selectedFile });
    return {
      content: response.data.content,
      language: response.data.language,
    };
  };

  // data fetching
  const {
    data: fileData,
    isError,
    isFetching,
  } = useQuery(["fileContent", selectedFile], fetchFileContent, {
    enabled: !!selectedFile,
    staleTime: 3600000,
    cacheTime: 3600000,
  });

  const handleNewTab = () => {
    if (!selectedFile) return;
    addTab({
      tabId: currentMaxTabId + 1,

      tabContent: (
        <FileContent
          content={fileData.content}
          maxLineChars={fileData.content.length.toString().length}
          language={fileData.language}
        />
      ),
      tabName: selectedFile,
    });
  };

  // Error Handling and Logging
  if (isError) {
    console.error("Error fetching file content.");
    return <div>Error loading file.</div>;
  }

  return (
    <div className="relative hidden w-full flex-grow flex-col overflow-hidden rounded-md rounded-md bg-gray-800 md:flex">
      {isFetching && !fileData && <LoadingState />}

      {fileData && (
        <>
          <FileContent
            content={fileData.content}
            maxLineChars={fileData.content.length.toString().length}
            language={fileData.language}
          />
          <button
            className={"absolute right-2 top-2 rounded-md bg-sky-700 p-1"}
          >
            <TbDeviceTabletShare size={20} onClick={handleNewTab} />
          </button>
        </>
      )}
    </div>
  );
};

export default CodeViewer;

const LoadingState: React.FC = () => (
  <div className="flex flex-grow items-center justify-center">
    <LoadingSpinner />
  </div>
);
