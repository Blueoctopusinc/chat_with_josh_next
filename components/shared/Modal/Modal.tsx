import React, { useEffect, useRef } from "react";
import { useUIStore } from "@/stores/uiStore";
import classNames from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import useKey from "@/hooks/utils/useKey";
import ModalBody from "@/components/shared/Modal/ModalBody";
import modalBody from "@/components/shared/Modal/ModalBody";
const Modal: React.FC = () => {
  const { isModalOpen, modalContent, modalConfig, closeModal } = useUIStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      modalContent: state.modalContent,
      modalConfig: state.modalConfig,
      closeModal: state.closeModal,
    }),
  );

  useKey("Escape", () => {
    if (isModalOpen) {
      closeModal();
    }
  });
  if (!isModalOpen) return null;

  const modalClassNames = classNames(
    //    modelConfig variant == fullScreen
    " fixed  z-50 p-2 flex flex-col gap-2 items-center justify-center transition-opacity opacity-100",
    {
      "opacity-0": !isModalOpen,
      "opacity-100": isModalOpen,
      "bg-sky-900 rounded-md bg-opacity-90 md:inset-2 w-full md:w-[98%] max-w-7xl h-full  md:h-[95%] my-auto mx-auto":
        modalConfig.variant == "fullScreen",
      "bg-transparent": modalConfig.variant == "default",
    },
  );
  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity ${
        isModalOpen ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!isModalOpen}
    >
      {/* Gray Overlay */}
      <div
        className="fixed inset-0 bg-gray-600 opacity-50"
        onClick={closeModal}
      ></div>

      {/* Escape Instruction */}
      <div id="modalInstruction" className="hidden">
        Press Escape to close the modal.
      </div>

      {/* Actual Modal */}
      <ModalBody className={modalClassNames}>
        {modalContent}
      </ModalBody>
    </div>
  );
};

export default Modal;
