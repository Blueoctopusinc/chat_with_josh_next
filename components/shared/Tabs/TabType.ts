import React from "react";

export type Tab = {
  tabId: number;
  tabName: string;
  tabContent: React.ReactNode;
  permanent?: boolean;
};