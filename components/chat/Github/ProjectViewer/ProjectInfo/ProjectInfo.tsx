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
  const [totalBytes, setTotalBytes] = useState(0);

  useEffect(() => {
    if (project && project.languages) {
      setTotalBytes(
        Object.values(project.languages).reduce((acc, curr) => acc + curr, 0),
      );
    }
  }, [project]);
  return (
    <div className="flex flex-col gap-4 overflow-y-scroll">
      <h1 className="text-center text-2xl font-semibold">{project?.name}</h1>
      <p className="text-sm">{project?.summary}</p>
      <LanguageBar languages={project.languages} />
      {project.technologies && (
        <TechnologyList technologies={project.technologies} />
      )}
    </div>
  );
};

export default ProjectInfo;
