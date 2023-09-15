import {AiOutlineClose} from "react-icons/ai";
import React, {useEffect, useRef} from "react";
import {useUIStore} from "@/stores/uiStore";

interface ModalBodyProps {
    children: React.ReactNode;
    className?: string;

}
const ModalBody: React.FC<ModalBodyProps> = ({ children, className  }) => {
     const { isModalOpen, closeModal } = useUIStore(
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

  return (
    <div
        className={className}
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
          {children}
        </div>
      </div>);
}

export default ModalBody;