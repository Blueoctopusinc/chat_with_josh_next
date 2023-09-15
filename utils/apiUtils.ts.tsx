import axios from "axios";

export const fetchFileStructure = async (repo) => {
  const apiUrl = `http://localhost:8000/api/github_store/repo/${repo}/tree/`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    // Log error information
    console.error("Error fetching file structure: ", error);
    throw error;
  }
};
