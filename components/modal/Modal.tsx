import React, { useEffect, useRef } from "react";
import { useUIStore } from "@/stores/uiStore";
import classNames from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import useKey from "@/hooks/utils/useKey";
const Modal: React.FC = () => {
  const { isModalOpen, modalContent, modalConfig, closeModal } = useUIStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      modalContent: state.modalContent,
      modalConfig: state.modalConfig,
      closeModal: state.closeModal,
    }),
  );
  const modalRef = useRef(null);
  useEffect(() => {
    if (isModalOpen) {
      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = modalRef.current;
      const firstFocusableElement =
        modal.querySelectorAll(focusableElements)[0]; // get first element to be focused
      firstFocusableElement.focus();

      // ... (trap focus code if needed)
    }
  }, [isModalOpen]);
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
      <div
        className={modalClassNames}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription modalInstruction"
        ref={modalRef}
      >
        <div className="relative h-[50px] w-full">
          <button
            className="absolute right-0 top-0 z-50 rounded-md bg-red-700 p-2"
            onClick={closeModal}
            aria-label="Close"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <div
          className="h-full max-h-full w-full max-w-7xl overflow-y-scroll"
          id="modalDescription"
        >
          {modalContent}
        </div>
      </div>
    </div>
  );
};

export default Modal;
