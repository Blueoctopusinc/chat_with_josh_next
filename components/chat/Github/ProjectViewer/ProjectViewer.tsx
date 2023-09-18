import React, {useEffect, useState} from "react";
import { useQueryClient } from "react-query";
import { fetchFileStructure } from "@/utils/apiUtils.ts";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ProjectInfo from "@/components/chat/Github/ProjectViewer/ProjectInfo";
import MarkDownViewer from "@/components/chat/Github/ProjectViewer/MarkDownViewer/MarkDownViewer";
import FileViewer from "@/components/chat/Github/ProjectViewer/FileViewer/FileViewer";
import { AiOutlineClose } from "react-icons/ai";
import useModalStore from "@/stores/modalStore";
import useTabs, {TabProvider} from "@/hooks/useTabs";
import Tabs from "@/components/shared/Tabs";
import TabContent from "@/components/shared/Tabs/TabContent";

interface ProjectViewerProps {
  project: any;  // Replace 'any' with your actual project type
}

const ProjectViewer: React.FC<ProjectViewerProps> = ({ project }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore((state) => ({
    closeModal: state.closeModal,
  }));
  const [isInitialized, setIsInitialized] = useState(false);

  const { addTab, setActiveTab } = useTabs();  // useTabs hook

  // Prefetch the file tree data
  useEffect(() => {
    queryClient.prefetchQuery(["fileStructure", project.name], () =>
      fetchFileStructure(project.name),
    );
  }, [project]);

  // Initialize tabs if they haven't been initialized yet
useEffect(() => {
  if (!isInitialized) {    // Add initial tabs
    addTab({
      tabId: 1,
      tabName: "Project Info",
      tabContent: <ProjectInfo project={project}/>,
      permanent: true,
    });
    addTab({
      tabId: 2,
      tabName: "ReadMe",
      tabContent: <MarkDownViewer ReadMeContent={project.readme} />,
      permanent: true,
    });
    addTab({
      tabId: 3,
      tabName: "Files",
      tabContent: <FileViewer githubRepo={project.name} />,
      permanent: true,
    });
    setActiveTab(1);  // Set active tab to "Project Info"
    setIsInitialized(true); // Set the flag to true to prevent re-initialization
  }
  }, [project, addTab, setActiveTab, isInitialized]);

  return (
    <div className="w-full flex h-full max-h-full flex-grow flex-col">

      <div className={"sticky top-0 flex w-full gap-2 bg-sky-900 px-2 py-2"}>
                <Tabs />

        <button
          className="z-50 mx-auto my-auto flex h-[52px] w-[52px] rounded-md bg-red-700"
          onClick={closeModal}
          aria-label="Close"
        >
          <AiOutlineClose className={"mx-auto my-auto"} size={20} />
        </button>
      </div>

        <TabContent />
    </div>
  );
};

export default ProjectViewer;
