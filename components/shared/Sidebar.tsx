import { useEffect, useCallback } from "react";
import { useUIStore } from "@/stores/uiStore";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import ControlKey from "@/components/shared/KeyboardControl";

const wobble = {
  scale: [1, 1.02, 1, 1.02, 1],
  rotate: [0, -2, 2, -2, 0],
  transition: { duration: 0.15, ease: "easeInOut" },
};

function SideBar() {
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const sidebarControls = useAnimation();
  const buttonControls = useAnimation();

  const handleColorChange = (color) => {
    buttonControls
      .start({
        backgroundColor: color,
        transition: { ease: "easeInOut", duration: 0.15 },
      })
      .then(() => {
        buttonControls.start(wobble);
      });
  };

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      handleColorChange("#0369a1");
      sidebarControls.start(
        { x: "-100%" },
        { type: "tween", ease: "easeInOut", duration: 0.15 },
      );
    } else {
      handleColorChange("#EF4444");
      sidebarControls.start(
        { x: "0%" },
        { type: "tween", ease: "easeInOut", duration: 0.15 },
      );
    }
    useUIStore.getState().toggleMenu();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "m") {
        toggleMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleMenu]);
  return (
    <>
      <motion.button
        animate={buttonControls}
        initial={{ backgroundColor: isMenuOpen ? "#EF4444" : "#0369a1" }}
        className="absolute left-3 top-2 z-[100] flex flex-col items-center justify-center gap-2 rounded-md p-2"
        onClick={toggleMenu}
        transition={{ ease: "easeInOut", duration: 0.15 }}
        aria-expanded={isMenuOpen} // ARIA attribute to describe the expanded state
        aria-controls="sidebar" // Points to the ID of the sidebar
      >
        <ControlKey commandKeys={["M"]} />
      </motion.button>
      {/*    Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.15 }}
            className="fixed left-0 top-0 z-[59] h-full w-screen bg-black"
          />
        )}
      </AnimatePresence>
      {/*  Siderbar */}
      <motion.div
        animate={sidebarControls}
        initial={{ x: isMenuOpen ? "0%" : "-100%" }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.15 }}
        className="fixed left-0 top-0 z-[60] flex h-full w-screen flex-col justify-between bg-sky-700 md:w-64"
        id="sidebar" // ID for the sidebar
        role="navigation" // ARIA role for navigation
        aria-label="Main Navigation" // Descriptive label
      >
        {/* Other sidebar content goes here */}
      </motion.div>
    </>
  );
}

export default SideBar;
