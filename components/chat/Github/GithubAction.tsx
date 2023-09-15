import GitHubProject from "@/types/portfolio/GithubProject";
import React from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { icons } from "react-icons";
import classNames from "classnames";
import Action from "@/components/chat/Action/Action";
import { useUIStore } from "@/stores/uiStore";
import ProjectViewer from "@/components/chat/Github/ProjectViewer/ProjectViewer";
interface GithubActionProps {
  project: GitHubProject;
}

const GithubAction: React.FC<GithubActionProps> = ({ project }) => {
  const { name, github_link, readme, file_structure, technologies } = project;
  const { toggleModal, modalContent, openModal } = useUIStore((state) => ({
    toggleModal: state.toggleModal,
    modalContent: state.modalContent,
    openModal: state.openModal,
  }));
  const handleClick = () => {
    openModal(
      <ProjectViewer project={project} />,
      { variant: "fullScreen" },
      () => {
        console.log("callback");
      },
    );
  };
  return (
    <Action
      onClick={() => handleClick()}
      icon={<VscGithubInverted className="ml-auto h-full " size={20} />}
    >
      <div className=" flex flex-row gap-4 pl-2">{name}</div>
    </Action>
  );
};

export default GithubAction;
