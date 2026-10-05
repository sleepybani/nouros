import { Injectable, computed, signal } from '@angular/core';
import { findAppById } from './app-registry';
import { AppId, AppParams } from './os-app';

export interface WindowState {
  appId: AppId;
  params: AppParams;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}

const CASCADE_START = { x: 140, y: 40 };
const CASCADE_STEP = 32;
const CASCADE_LENGTH = 6;

export const MIN_WINDOW_SIZE = { width: 320, height: 220 };

@Injectable({ providedIn: 'root' })
export class WindowManager {
  private readonly windowList = signal<WindowState[]>([]);
  private highestZIndex = 0;
  private openedWindowCount = 0;

  readonly windows = this.windowList.asReadonly();

  readonly focusedWindow = computed(() => {
    const visibleWindows = this.windowList().filter((appWindow) => !appWindow.minimized);
    if (visibleWindows.length === 0) {
      return undefined;
    }
    return visibleWindows.reduce((top, appWindow) =>
      appWindow.zIndex > top.zIndex ? appWindow : top,
    );
  });

  isOpen(appId: AppId): boolean {
    return this.windowList().some((appWindow) => appWindow.appId === appId);
  }

  isFocused(appId: AppId): boolean {
    return this.focusedWindow()?.appId === appId;
  }

  /** Opens the app window, or brings it back to the front with the new params if already open. */
  open(appId: AppId, params: AppParams = {}): void {
    if (this.isOpen(appId)) {
      this.updateWindow(appId, { params, minimized: false, zIndex: this.nextZIndex() });
      return;
    }

    const { width, height } = findAppById(appId).defaultSize;
    const cascadeOffset = (this.openedWindowCount % CASCADE_LENGTH) * CASCADE_STEP;
    this.openedWindowCount++;

    const newWindow: WindowState = {
      appId,
      params,
      x: CASCADE_START.x + cascadeOffset,
      y: CASCADE_START.y + cascadeOffset,
      width,
      height,
      zIndex: this.nextZIndex(),
      minimized: false,
      maximized: false,
    };
    this.windowList.update((windows) => [...windows, newWindow]);
  }

  close(appId: AppId): void {
    this.windowList.update((windows) => windows.filter((appWindow) => appWindow.appId !== appId));
  }

  focus(appId: AppId): void {
    if (this.isFocused(appId)) {
      return;
    }
    this.updateWindow(appId, { minimized: false, zIndex: this.nextZIndex() });
  }

  minimize(appId: AppId): void {
    this.updateWindow(appId, { minimized: true });
  }

  /** Taskbar behaviour: clicking the focused window hides it, clicking any other one shows it. */
  toggleFromTaskbar(appId: AppId): void {
    if (this.isFocused(appId)) {
      this.minimize(appId);
    } else {
      this.focus(appId);
    }
  }

  moveTo(appId: AppId, x: number, y: number): void {
    this.updateWindow(appId, { x, y });
  }

  /** Never smaller than MIN_WINDOW_SIZE, so the title bar and buttons always fit. */
  resize(appId: AppId, width: number, height: number): void {
    this.updateWindow(appId, {
      width: Math.max(width, MIN_WINDOW_SIZE.width),
      height: Math.max(height, MIN_WINDOW_SIZE.height),
    });
  }

  toggleMaximize(appId: AppId): void {
    const appWindow = this.windowList().find((candidate) => candidate.appId === appId);
    if (appWindow) {
      this.updateWindow(appId, { maximized: !appWindow.maximized });
    }
  }

  private nextZIndex(): number {
    this.highestZIndex++;
    return this.highestZIndex;
  }

  private updateWindow(appId: AppId, changes: Partial<WindowState>): void {
    this.windowList.update((windows) =>
      windows.map((appWindow) =>
        appWindow.appId === appId ? { ...appWindow, ...changes } : appWindow,
      ),
    );
  }
}
