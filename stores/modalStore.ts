import { create } from "zustand";
import React from "react";

export interface ModalState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  modalConfig: { [key: string]: any };
  openModal: (
    content: React.ReactNode,
    config?: { [key: string]: any },
    onClose?: () => void,
  ) => void;
  closeModal: () => void;
  onModalClose?: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalContent: null,
  modalConfig: {},
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

export default useModalStore;
