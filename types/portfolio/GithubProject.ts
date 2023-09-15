import FileStructure from "@/types/portfolio/FileStructure";
import Technology from "@/types/portfolio/Technology";

interface GitHubProject {
  id: number;
  name: string;
  github_link: string;
  readme: string;
  summary: string;
  file_structure: FileStructure;
  technologies: Technology[];
  languages: Record<string, number>;
}

export default GitHubProject;
