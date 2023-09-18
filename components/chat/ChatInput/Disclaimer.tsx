import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Disclaimer: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const storedValue = localStorage.getItem("showDisclaimer");
    setShowDisclaimer(storedValue !== "false");
  }, []);

  const dismissDisclaimer = () => {
    localStorage.setItem("showDisclaimer", "false");
    setShowDisclaimer(false);
  };

  return (
    <AnimatePresence>
      {showDisclaimer ? (
        <motion.div
          initial={{ opacity: 1, height: "auto" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.1 }}
          className="flex items-center justify-center gap-1 md:gap-2"
          style={{ overflow: "hidden" }}
        >
          <div className={"flex gap-2 rounded-lg bg-gray-800 p-2"}>
            <h2 className="my-auto text-base font-bold leading-relaxed text-sky-700 md:text-lg">
              Disclaimer
            </h2>
            <p className="my-auto rounded-lg bg-gray-900 p-3 text-left text-[0.6rem] text-gray-200 md:text-xs">
              This project uses large language models and may give unexpected or
              offensive responses. No liability is accepted for any consequences
              of using this service.
            </p>
            <button
              onClick={dismissDisclaimer}
              className="rounded-lg bg-gray-600 bg-red-500 p-2 text-xs text-white"
              aria-label="Dismiss Disclaimer"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Disclaimer;
