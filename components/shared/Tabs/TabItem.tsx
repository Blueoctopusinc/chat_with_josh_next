import React from "react";
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
import useTabs from "@/hooks/useTabs";
import { Tab } from "@/components/shared/Tabs/TabType";

type TabItemProps = {
  tab: Tab;
  index: number;
};

const TabItem: React.FC<TabItemProps> = ({ tab, index }) => {
  const { activeTab, setActiveTab, removeTab } = useTabs();
  const isActive = tab.tabId === activeTab;

  return (
    <motion.div
      initial={isActive ? { opacity: 0 } : {}}
      animate={isActive ? { opacity: 1 } : {}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="relative z-10 flex h-[40px] w-fit items-center space-x-2"
      role="presentation"
    >
      <button
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        className={`flex h-full w-full min-w-fit gap-2 rounded-md px-4 py-2 text-center text-sm font-medium transition duration-200 ease-in-out focus:outline-none ${
          isActive
            ? "border-[1px] border-white  text-sky-400"
            : "border-[1px] border-white text-gray-200 hover:bg-sky-500 hover:text-white"
        }`}
        onClick={() => {
          setActiveTab(tab.tabId);
        }}
      >
        <span className={" min-w-content"}>{tab.tabName}</span>
      </button>
      {!tab.permanent && (
        <button
          className="absolute -right-1 -top-1 rounded-md bg-red-500 p-[0.5px] text-red-700 hover:text-white focus:outline-none"
          aria-label="Close tab"
          onClick={() => removeTab(tab.tabId)}
        >
          <CgClose />
        </button>
      )}
    </motion.div>
  );
};

export default TabItem;
