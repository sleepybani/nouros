import { Component, computed, inject, input } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { findAppById } from '../../core/app-registry';
import { WindowManager, WindowState } from '../../core/window-manager';
import { AppContent } from '../app-content/app-content';

/** Keep in sync with --taskbar-height in src/styles/_tokens.scss. */
const TASKBAR_HEIGHT = 48;
const SCREEN_MARGIN = 16;
const KEYBOARD_RESIZE_STEP = 24;

const RESIZE_KEYS: Record<string, { width: number; height: number }> = {
  ArrowRight: { width: KEYBOARD_RESIZE_STEP, height: 0 },
  ArrowLeft: { width: -KEYBOARD_RESIZE_STEP, height: 0 },
  ArrowDown: { width: 0, height: KEYBOARD_RESIZE_STEP },
  ArrowUp: { width: 0, height: -KEYBOARD_RESIZE_STEP },
};

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
    '[class.app-window--maximized]': 'state().maximized',
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
  private resizeStart:
    { pointerX: number; pointerY: number; width: number; height: number } | undefined;

  protected readonly app = computed(() => findAppById(this.state().appId));
  protected readonly params = computed(() => this.state().params);
  protected readonly titleId = computed(() => `window-title-${this.state().appId}`);
  protected readonly isFocused = computed(() => this.windowManager.isFocused(this.state().appId));

  protected startDrag(event: PointerEvent): void {
    const clickedAButton = (event.target as HTMLElement).closest('button');
    if (event.button !== 0 || clickedAButton || this.state().maximized) {
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

  protected startResize(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    const { width, height } = this.state();
    this.resizeStart = { pointerX: event.clientX, pointerY: event.clientY, width, height };
  }

  protected resize(event: PointerEvent): void {
    if (!this.resizeStart) {
      return;
    }
    const { pointerX, pointerY, width, height } = this.resizeStart;
    this.resizeTo(width + event.clientX - pointerX, height + event.clientY - pointerY);
  }

  protected endResize(): void {
    this.resizeStart = undefined;
  }

  protected resizeWithKeyboard(event: KeyboardEvent): void {
    const change = RESIZE_KEYS[event.key];
    if (!change) {
      return;
    }
    event.preventDefault();
    const { width, height } = this.state();
    this.resizeTo(width + change.width, height + change.height);
  }

  protected toggleMaximize(): void {
    this.windowManager.toggleMaximize(this.state().appId);
  }

  protected toggleMaximizeFromTitleBar(event: MouseEvent): void {
    const clickedAButton = (event.target as HTMLElement).closest('button');
    if (!clickedAButton) {
      this.toggleMaximize();
    }
  }

  /** The window can grow up to the screen edge, never under the taskbar. */
  private resizeTo(width: number, height: number): void {
    const { x, y, appId } = this.state();
    const maxWidth = window.innerWidth - x - SCREEN_MARGIN;
    const maxHeight = window.innerHeight - TASKBAR_HEIGHT - y - SCREEN_MARGIN;
    this.windowManager.resize(appId, Math.min(width, maxWidth), Math.min(height, maxHeight));
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
