import GitHubProject from "@/types/portfolio/GithubProject";
import React, { useEffect } from "react";
import Technology from "@/types/portfolio/Technology";
import ProjectInfo from "@/components/chat/Github/ProjectViewer/ProjectInfo/ProjectInfo";
import MarkDownViewer from "@/components/chat/Github/ProjectViewer/MarkDownViewer/MarkDownViewer";
import { motion, useAnimation } from "framer-motion";
import FileViewer from "@/components/chat/Github/ProjectViewer/FileViewer/FileViewer";
import Tabs from "@/components/shared/Tabs/Tabs";
import { useQueryClient } from "react-query";
import { fetchFileStructure } from "@/utils/apiUtils.ts";
import { useInstanceTabStore } from "@/hooks/stores/useInstanceTabStore";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface ProjectViewerProps {
  project: GitHubProject;
}

type ProjectViewerProps = {
  project: any; // Replace 'any' with the actual type of your project
};
const ProjectViewer: React.FC<ProjectViewerProps> = ({ project }) => {
  const queryClient = useQueryClient();
  const instanceId = `${project.name}_project_viewer`; // Define an instance ID for this component

  const { state, addTabs, setActiveTab, TabContent, TabProvider } =
    useInstanceTabStore(instanceId);

  // Prefetch the file tree data
  useEffect(() => {
    queryClient.prefetchQuery(["fileStructure", project.name], () =>
      fetchFileStructure(project.name),
    );
  }, [project]);

  // Initialize tabs if they haven't been initialized yet
  useEffect(() => {
    if (state && !state.tabs.length) {
      addTabs([
        {
          tabContent: <ProjectInfo project={project} />,
          tabName: "Project Info",
          permanent: true,
        },
        {
          tabContent: <MarkDownViewer ReadMeContent={project.readme} />,
          tabName: "ReadMe",
          permanent: true,
        },
        {
          tabContent: <FileViewer githubRepo={project.name} />,
          tabName: "Files",
          permanent: true,
        },
      ]);
      setActiveTab(1); // Set the active tab to 'Project Info'
    }
  }, [state, project]); // Added state as a dependency

  // Handle null or undefined state
  if (!state)
    return (
      <div className="w-7xl flex h-full max-h-full flex-grow flex-col gap-4">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-7xl flex h-full max-h-full flex-grow flex-col gap-4">
      <TabProvider>
        <Tabs instanceId={instanceId} />
        <TabContent />
      </TabProvider>
    </div>
  );
};

export default ProjectViewer;
