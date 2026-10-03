import { Type } from '@angular/core';

export type AppId = 'explorer' | 'terminal' | 'mail' | 'notes' | 'paint' | 'games' | 'trash' | 'cv';

export type AppParams = Readonly<Record<string, string>>;

/** Where the app launcher lives: desktop grid, bottom-right corner (like a real trash), or taskbar. */
export type AppPlacement = 'desktop' | 'corner' | 'taskbar';

export interface WindowSize {
  width: number;
  height: number;
}

export interface OsApp {
  id: AppId;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  placement: AppPlacement;
  defaultSize: WindowSize;
  loadComponent: () => Promise<Type<unknown>>;
}
