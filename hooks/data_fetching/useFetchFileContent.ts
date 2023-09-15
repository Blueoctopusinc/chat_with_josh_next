import { useQuery } from "react-query";
import axios from "axios";

type FileContentReturnType = {
  content: string;
  language: string;
};

const useFetchFileContent = (
  githubRepoUrl: string,
  selectedFile: string | null,
) => {
  const fetchFileContent = async (): Promise<FileContentReturnType | null> => {
    if (!selectedFile) return null;
    const apiUrl = `http://localhost:8000/api/github_store/repo/${githubRepoUrl}/file/`;
    const response = await axios.post(apiUrl, { path: selectedFile });
    return {
      content: response.data.content,
      language: response.data.language,
    };
  };

  const { data, isError, isFetching } = useQuery(
    ["fileContent", selectedFile],
    fetchFileContent,
    {
      enabled: !!selectedFile,
      staleTime: 3600000,
      cacheTime: 3600000,
    },
  );

  return { data, isError, isFetching };
};

export default useFetchFileContent;
