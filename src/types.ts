import React from 'react';

export type AppId = 'ai' | 'settings' | 'browser' | 'media' | 'phone' | 'installer' | 'diagnostics';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface AppConfig {
  id: AppId;
  title: string;
  icon: string;
  component: React.ComponentType;
}
