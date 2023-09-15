import React, { useEffect, useState } from "react";
import { useInstanceTabStore } from "@/hooks/stores/useInstanceTabStore";
import useKey from "@/hooks/utils/useKey";
import { CgClose } from "react-icons/cg";

type TabsProps = {
  instanceId: string;
};

type Tab = {
  tabId: number;
  tabName: string;
  permanent?: boolean;
};

const Tabs: React.FC<TabsProps> = ({ instanceId }) => {
  const { state, setActiveTab, removeTab } = useInstanceTabStore(instanceId);

  // Initialize from Zustand store
  const initialTabIndex = state
    ? state.tabs.findIndex((tab) => tab.tabId === state.activeTab)
    : 0;
  const [currentTabIndex, setCurrentTabIndex] = useState(initialTabIndex);

  useEffect(() => {
    try {
      if (state) {
        const newTabIndex = state.tabs.findIndex(
          (tab) => tab.tabId === state.activeTab,
        );
        setCurrentTabIndex(newTabIndex);
      }
    } catch (error) {
      console.error(`Failed to initialize tab position: ${error}`);
    }
  }, [state]);

  useKey("ArrowRight", () => {
    const nextIndex = (currentTabIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex].tabId);
    setCurrentTabIndex(nextIndex);
  });

  useKey("ArrowLeft", () => {
    const prevIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[prevIndex].tabId);
    setCurrentTabIndex(prevIndex);
  });

  useKey("Home", () => {
    setActiveTab(tabs[0].tabId);
    setCurrentTabIndex(0);
  });

  useKey("End", () => {
    const lastIndex = tabs.length - 1;
    setActiveTab(tabs[lastIndex].tabId);
    setCurrentTabIndex(lastIndex);
  });
  // Handle null or undefined state
  if (!state) return null;

  const { tabs, activeTab } = state;

  return (
    <div
      className="relative flex min-h-[55px] w-full gap-2  overflow-x-scroll rounded-md bg-gray-800 p-2"
      role="tablist"
    >
      {tabs.map((tab, index) => (
        <div
          key={tab.tabId}
          className="relative z-10 flex  h-[40px] w-fit items-center space-x-2"
          role="presentation"
        >
          <button
            role="tab"
            aria-selected={tab.tabId === activeTab}
            tabIndex={tab.tabId === activeTab ? 0 : -1}
            className={`flex h-full w-full min-w-fit gap-2 rounded-md px-4 py-2 text-center text-sm font-medium transition duration-200 ease-in-out focus:outline-none ${
              tab.tabId === activeTab
                ? "bg-white text-sky-700" // Active state
                : "border-[1px] border-white text-gray-200 hover:bg-sky-500 hover:text-white"
            }`}
            onClick={() => {
              setActiveTab(tab.tabId);
              setCurrentTabIndex(index);
            }}
          >
            <span className={" min-w-content "}>{tab.tabName}</span>
          </button>
          {!tab.permanent && (
            <button
              className="absolute -right-1 -top-1 rounded-md bg-red-500 p-[0.5px] text-red-700 hover:text-white focus:outline-none"
              aria-label="Close tab"
              onClick={() => removeTab(tab.tabId ? tab.tabId : 0)}
            >
              <CgClose />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
