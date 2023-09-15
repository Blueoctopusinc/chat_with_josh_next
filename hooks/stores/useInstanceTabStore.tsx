import React, { createContext, FC, ReactNode, useEffect } from "react";
import { Tab } from "@/components/shared/Tabs/TabType"; // Change to your actual import
import { TabState, useTabStore } from "@/stores/tabsStore";

type InstanceTabState = {
  tabs: Tab[];
  activeTab: number;
};
type TabInstanceType = {
  state: InstanceTabState | null;
  addTab: (tab: Tab, changeCurrent?: boolean) => void;
  addTabs: (tabs: Tab[], changeCurrent?: boolean) => void;
  removeTab: (tabId: number) => void;
  setActiveTab: (tabId: number) => void;
  TabContent: React.ReactNode;
};

export const TabContext = createContext<TabInstanceType | null>(null);

export const useInstanceTabStore = (instanceId: string) => {
  const state = useTabStore((store) => store.instances[instanceId]);
  const addTabRaw = useTabStore((store) => store.addTab);
  const addTabsRaw = useTabStore((store) => store.addTabs);
  const removeTabRaw = useTabStore((store) => store.removeTab);
  const setActiveTabRaw = useTabStore((store) => store.setActiveTab);
  const initializeInstance = useTabStore((store) => store.initializeInstance);

  // Initialize instance if it doesn't exist
  useEffect(() => {
    initializeInstance(instanceId);
  }, [instanceId, initializeInstance]);

  const addTab = (tab: Tab, changeCurrent?: boolean) =>
    addTabRaw(instanceId, tab, changeCurrent);
  const addTabs = (tabs: Tab[], changeCurrent?: boolean) =>
    addTabsRaw(instanceId, tabs, changeCurrent);
  const removeTab = (tabId: number) => removeTabRaw(instanceId, tabId);
  const setActiveTab = (tabId: number | undefined) =>
    setActiveTabRaw(instanceId, tabId ? tabId : 1);

  const TabContent: React.FC = () => {
    if (!state) return null;

    const { tabs, activeTab } = state;
    const activeContent =
      tabs.find((tab) => tab.tabId === activeTab)?.tabContent || null;

    return <>{activeContent}</>;
  };
  const TabProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <TabContext.Provider
        value={{ state, addTab, addTabs, removeTab, setActiveTab, TabContent }}
      >
        {children}
      </TabContext.Provider>
    );
  };
  return {
    state,
    addTab,
    addTabs,
    removeTab,
    setActiveTab,
    TabContent,
    TabProvider,
  };
};
