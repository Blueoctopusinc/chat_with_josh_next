import React, { useEffect, useState } from "react";
import Technology from "@/types/portfolio/Technology";
import GitHubProject from "@/types/portfolio/GithubProject";
import LanguageBar from "@/components/chat/Github/ProjectViewer/ProjectInfo/LanguageBar";
import TechnologyList from "@/components/chat/Github/ProjectViewer/ProjectInfo/TechnologyList";
interface ProjectInfoProps {
  groupedTechnologies: { [key: string]: Technology[] };
  project: GitHubProject;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  return (
    <div className="flex h-fit flex-col gap-4 overflow-y-scroll bg-gray-800 p-4">
      <h1 className="text-center text-2xl font-semibold">{project?.name}</h1>

      <LanguageBar languages={project.languages} />

      <p className="text-sm">{project?.summary}</p>
      {project.technologies && (
        <TechnologyList technologies={project.technologies} />
      )}
    </div>
  );
};

export default ProjectInfo;
