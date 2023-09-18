import React from "react";
import useTabs from "@/hooks/useTabs";

const TabContent: React.FC = () => {
  const { tabs, activeTab } = useTabs(); // Use the hook to get tabs and activeTab

  if (!tabs || tabs.length === 0) return null; // Handle empty or undefined tabs

  return (
    <>
      {tabs.map((tab) => (
        <div
          key={tab.tabId}
          className={`${
            tab.tabId === activeTab ? "flex" : "hidden"
          } max-h-full flex-grow overflow-y-auto p-2`}
        >
          {tab.tabContent}
        </div>
      ))}
    </>
  );
};

export default TabContent;
