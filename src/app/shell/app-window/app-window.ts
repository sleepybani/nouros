import { Component, computed, inject, input } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { findAppById } from '../../core/app-registry';
import { WindowManager, WindowState } from '../../core/window-manager';
import { AppContent } from '../app-content/app-content';

/** Keep in sync with --taskbar-height in src/styles/_tokens.scss. */
const TASKBAR_HEIGHT = 48;
const SCREEN_MARGIN = 16;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

@Component({
  selector: 'app-window',
  imports: [AppContent],
  templateUrl: './app-window.html',
  styleUrl: './app-window.scss',
  host: {
    role: 'dialog',
    '[attr.aria-labelledby]': 'titleId()',
    '[class.app-window--focused]': 'isFocused()',
    '[hidden]': 'state().minimized',
    '[style.--window-x]': 'state().x + "px"',
    '[style.--window-y]': 'state().y + "px"',
    '[style.--window-width]': 'state().width + "px"',
    '[style.--window-height]': 'state().height + "px"',
    '[style.z-index]': 'state().zIndex',
    '(pointerdown)': 'bringToFront()',
    '(focusin)': 'bringToFront()',
    '(keydown.escape)': 'close()',
  },
})
export class AppWindow {
  readonly state = input.required<WindowState>();

  private readonly launcher = inject(AppLauncher);
  private readonly windowManager = inject(WindowManager);
  private dragOffset: { x: number; y: number } | undefined;

  protected readonly app = computed(() => findAppById(this.state().appId));
  protected readonly params = computed(() => this.state().params);
  protected readonly titleId = computed(() => `window-title-${this.state().appId}`);
  protected readonly isFocused = computed(() => this.windowManager.isFocused(this.state().appId));

  protected startDrag(event: PointerEvent): void {
    const clickedAButton = (event.target as HTMLElement).closest('button');
    if (event.button !== 0 || clickedAButton) {
      return;
    }
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    this.dragOffset = { x: event.clientX - this.state().x, y: event.clientY - this.state().y };
  }

  /** Keeps the whole window on screen, above the taskbar. */
  protected drag(event: PointerEvent): void {
    if (!this.dragOffset) {
      return;
    }
    const { width, height, appId } = this.state();
    const maxX = Math.max(0, window.innerWidth - width - SCREEN_MARGIN);
    const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - height - SCREEN_MARGIN);
    const x = clamp(event.clientX - this.dragOffset.x, 0, maxX);
    const y = clamp(event.clientY - this.dragOffset.y, 0, maxY);
    this.windowManager.moveTo(appId, x, y);
  }

  protected endDrag(): void {
    this.dragOffset = undefined;
  }

  protected bringToFront(): void {
    if (!this.isFocused()) {
      this.launcher.focus(this.state().appId);
    }
  }

  protected minimize(): void {
    this.launcher.minimize(this.state().appId);
  }

  protected close(): void {
    this.launcher.close(this.state().appId);
  }
}
