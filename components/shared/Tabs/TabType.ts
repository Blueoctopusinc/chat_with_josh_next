import React from "react";

export interface Tab {
  tabContent: React.ReactNode;
  tabName: string;
  tabId?: number;
  permanent?: boolean;
}
