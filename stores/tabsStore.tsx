import { create } from "zustand";
import { devLog } from "@/utils/logging";
import { Tab } from "@/components/shared/Tabs/TabType";

export type TabState = {
  instances: {
    [instanceId: string]: {
      tabs: Tab[];
      activeTab: number;
    };
  };
  addTab: (instanceId: string, tab: Tab, changeCurrent?: boolean) => void;
  addTabs: (instanceId: string, tabs: Tab[], changeCurrent?: boolean) => void;
  removeTab: (instanceId: string, tabId: number) => void;
  setActiveTab: (instanceId: string, tabId: number) => void;
  initializeInstance: (instanceId: string) => void;
};

export const useTabStore = create<TabState>((set, get) => ({
  instances: {},
  addTab: (instanceId, tab: Tab, changeCurrent = false) => {
    try {
      const { instances } = get();
      const instance = instances[instanceId] || { tabs: [], activeTab: 1 };

      // If tabId is not provided, auto-generate it
      let newTabId = tab.tabId;
      if (newTabId === undefined) {
        const maxTabId = Math.max(0, ...instance.tabs.map((t) => t.tabId ?? 0));
        newTabId = maxTabId + 1;
      }

      const newTab = { ...tab, tabId: newTabId };

      const updatedInstance = {
        ...instance,
        tabs: [...instance.tabs, newTab],
        activeTab: changeCurrent ? newTabId : instance.activeTab,
      };
      set({
        instances: {
          ...instances,
          [instanceId]: updatedInstance,
        },
      });
      devLog(`Tab with ID ${newTabId} added to instance ${instanceId}.`);
    } catch (error) {
      devLog(`Failed to add tab to instance ${instanceId}: ${error}`, true);
    }
  },
  addTabs: (instanceId, tabs: Tab[], changeCurrent = false) => {
    try {
      const { instances } = get();
      const instance = instances[instanceId] || { tabs: [], activeTab: 1 };

      let maxTabId = Math.max(0, ...instance.tabs.map((t) => t.tabId ?? 0));

      // Create new tabs with incremented IDs if tabId is not provided
      const newTabs = tabs.map((tab) => {
        let newTabId = tab.tabId;
        if (newTabId === undefined) {
          maxTabId += 1;
          newTabId = maxTabId;
        }
        return { ...tab, tabId: newTabId };
      });

      const updatedInstance = {
        ...instance,
        tabs: [...instance.tabs, ...newTabs],
        activeTab: changeCurrent ? newTabs[0].tabId : instance.activeTab,
      };
      set({
        instances: {
          ...instances,
          [instanceId]: updatedInstance,
        },
      });
      devLog(
        `Tabs with IDs [${newTabs
          .map((t) => t.tabId)
          .join(", ")}] added to instance ${instanceId}.`,
      );
    } catch (error) {
      devLog(`Failed to add tabs to instance ${instanceId}: ${error}`, true);
    }
  },
  removeTab: (instanceId, tabId) => {
    try {
      const { instances } = get();
      const instance = instances[instanceId];
      if (!instance) return;

      // Filter out the tab with the given ID, only if it's not permanent
      const newTabs = instance.tabs.filter(
        (t) => t.tabId !== tabId || t.permanent,
      );

      const updatedInstance = {
        ...instance,
        tabs: newTabs,
        // If the activeTab was the one removed, set activeTab to the first tab in the new list
        activeTab:
          instance.activeTab === tabId
            ? newTabs.length > 0
              ? newTabs[0].tabId
              : 1
            : instance.activeTab,
      };

      set({
        instances: {
          ...instances,
          [instanceId]: updatedInstance,
        },
      });
      devLog(`Tab with ID ${tabId} removed from instance ${instanceId}.`);
    } catch (error) {
      devLog(
        `Failed to remove tab from instance ${instanceId}: ${error}`,
        true,
      );
    }
  },
  setActiveTab: (instanceId, tabId) => {
    try {
      const { instances } = get();
      const instance = instances[instanceId];
      if (!instance) return;

      set({
        instances: {
          ...instances,
          [instanceId]: {
            ...instance,
            activeTab: tabId,
          },
        },
      });
      devLog(`Active tab set to ID ${tabId} in instance ${instanceId}.`);
    } catch (error) {
      devLog(
        `Failed to set active tab in instance ${instanceId}: ${error}`,
        true,
      );
    }
  },
  initializeInstance: (instanceId: string) => {
    const { instances } = get();
    if (!instances[instanceId]) {
      set({
        instances: { ...instances, [instanceId]: { tabs: [], activeTab: 1 } },
      });
      devLog(`Instance ${instanceId} initialized.`);
    }
  },
}));
