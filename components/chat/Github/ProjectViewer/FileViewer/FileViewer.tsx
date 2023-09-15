import React, { useState } from "react";
import CodeViewer from "@/components/chat/Github/ProjectViewer/FileViewer/CodeViewer";
import FileTree from "@/components/chat/Github/ProjectViewer/FileViewer/FileTree/FileTree";

const FileViewer: React.FC<{
  githubRepo: string;
}> = ({ githubRepo }) => {
  return (
    <div className="flex h-full w-full flex-grow gap-2 overflow-y-auto">
      <FileTree repo={githubRepo} />
      <CodeViewer githubRepoUrl={githubRepo} />
    </div>
  );
};

export default FileViewer;
