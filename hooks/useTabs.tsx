import React, { createContext, useContext, useState } from "react";
import { Tab } from "@/components/shared/Tabs/TabType";

type TabContextType = {
  tabs: Tab[];
  activeTab: number;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: number) => void;
  setActiveTab: (tabId: number) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const addTab = (newTab: Tab) => {
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(newTab.tabId);
  };

  const removeTab = (tabId: number) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.tabId !== tabId));
    if (activeTab === tabId) {
      setActiveTab(tabs[0].tabId); // Set to the first tab if the active tab is removed
    }
  };

  return (
    <TabContext.Provider
      value={{ tabs, activeTab, addTab, removeTab, setActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};

const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabProvider");
  }
  return context;
};

export default useTabs;
