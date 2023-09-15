import { create } from "zustand";

interface GitHubItem {
  id: number;
  name: string;
  html_url: string;
  description: string;
  technologies: string[];
  image: string;
}

interface CVItem {
  id: number;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: string;
  message: string;
}

interface ChatStore {
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
  chatMessages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}
export const useChatStore = create<ChatStore>((set) => ({
  isChatOpen: false,
  setIsChatOpen: (isChatOpen: boolean) =>
    set(() => ({ isChatOpen: isChatOpen })),
  chatMessages: [],
  addMessage: (message: string) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  isProcessing: false,
  setIsProcessing: (processing: boolean) =>
    set(() => ({ isProcessing: processing })),
  isTyping: false,
  setIsTyping: (typing: boolean) => set(() => ({ isTyping: typing })),
}));
