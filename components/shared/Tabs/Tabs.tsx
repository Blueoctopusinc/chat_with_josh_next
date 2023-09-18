import React from 'react';
import TabItem from './TabItem';
import { AnimatePresence } from "framer-motion";
import useTabs from "@/hooks/useTabs";

const Tabs: React.FC = () => {
  const { tabs } = useTabs();

  const permanentTabs = tabs.filter((tab) => tab.permanent);
  const nonPermanentTabs = tabs.filter((tab) => !tab.permanent);

  return (
    <div
      className="relative flex min-h-[55px] w-full gap-2 overflow-x-scroll rounded-md bg-gray-800 p-2"
      role="tablist"
    >
      <div className="flex gap-2 bg-gray-700">
        {permanentTabs.map((tab, index) => (
          <TabItem key={`tab_${tab.tabId}`} tab={tab} index={index} />
        ))}
      </div>

      <div className="flex gap-2 bg-gray-800">
        <AnimatePresence>
          {nonPermanentTabs.map((tab, index) => (
            <TabItem key={`tab_${tab.tabId}`} tab={tab} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
