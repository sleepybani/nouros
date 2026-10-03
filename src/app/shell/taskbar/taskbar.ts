import { DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { OS_APPS, findAppById } from '../../core/app-registry';
import { WindowManager } from '../../core/window-manager';
import { TASKBAR_STATUSES } from '../../data/profile';

const CLOCK_REFRESH_MS = 15_000;

@Component({
  selector: 'app-taskbar',
  imports: [DatePipe],
  templateUrl: './taskbar.html',
  styleUrl: './taskbar.scss',
})
export class Taskbar {
  protected readonly launcher = inject(AppLauncher);
  protected readonly windowManager = inject(WindowManager);

  protected readonly statuses = TASKBAR_STATUSES;
  protected readonly taskbarApps = OS_APPS.filter((app) => app.placement === 'taskbar');
  protected readonly openApps = computed(() =>
    this.windowManager.windows().map((appWindow) => findAppById(appWindow.appId)),
  );
  protected readonly now = signal(new Date());

  constructor() {
    const clockTimer = setInterval(() => this.now.set(new Date()), CLOCK_REFRESH_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(clockTimer));
  }
}
