import create from "zustand";

interface FileViewerStore {
  selectedFile: string;
  setSelectedFile: (filePath: string) => void;
}

const useFileViewerStore = create<FileViewerStore>((set) => ({
  selectedFile: "",
  setSelectedFile: (filePath: string) =>
    set(() => ({ selectedFile: filePath })),
}));

export default useFileViewerStore;
