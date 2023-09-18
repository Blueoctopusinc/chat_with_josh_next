import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useRef } from "react";
import { useUIStore } from "@/stores/uiStore";
import useModalStore, { ModalState } from "@/stores/modalStore";
import {TabProvider} from "@/hooks/useTabs";

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}
const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  const { isModalOpen, closeModal, modalConfig, modalContent } = useModalStore(
    (state: ModalState) => ({
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
      if (!modal) return;

      const firstFocusableElement =
        modal?.querySelectorAll(focusableElements)[0];

      if (firstFocusableElement) {
        firstFocusableElement.focus();
      } else {
        console.warn("No focusable element found in the modal.");
      }
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
      <TabProvider>
      {!modalConfig.hideCloseButton && (

        <div className="relative h-[50px] w-full">

          <button
            className="absolute right-0 top-0 z-50 rounded-md bg-red-700 p-2"
            onClick={closeModal}
            aria-label="Close"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      )}
      <div className="h-full max-h-full w-full w-full" id="modalDescription">
        {children}
      </div>
        </TabProvider>
    </div>
  );
};

export default ModalBody;
