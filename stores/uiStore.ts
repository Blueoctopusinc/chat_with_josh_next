import { create } from "zustand";
import React from "react";

// Define the store state
interface UIState {
  isMenuOpen: boolean;
  isChatOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  modalConfig: { [key: string]: any };
  toggleMenu: () => void;
  closeMenu: () => void;
  toggleModal: () => void;
  closeModal: () => void;
  openModal: (
    content: React.ReactNode,
    config?: { [key: string]: any },
    onClose?: () => void,
  ) => void;
  onModalClose?: () => void;
}

// Create the store
export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  isChatOpen: false,

  isModalOpen: false,
  modalContent: null,
  modalConfig: {},

  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  openModal: (content, config = {}, onClose) =>
    set({
      isModalOpen: true,
      modalContent: content,
      modalConfig: config,
      onClose,
    }),
  closeModal: () => {
    set((state) => {
      if (state.onModalClose) {
        state.onModalClose();
      }
      return {
        isModalOpen: false,
        modalContent: null,
        modalConfig: {},
        onClose: undefined,
      };
    });
  },
}));
