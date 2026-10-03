import { Component, inject } from '@angular/core';
import { OS_APPS } from '../../core/app-registry';
import { WindowManager } from '../../core/window-manager';
import { AppWindow } from '../app-window/app-window';
import { DesktopIcon } from '../desktop-icon/desktop-icon';
import { ReminderWidget } from '../reminder-widget/reminder-widget';
import { Taskbar } from '../taskbar/taskbar';

@Component({
  selector: 'app-desktop',
  imports: [DesktopIcon, AppWindow, ReminderWidget, Taskbar],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss',
})
export class Desktop {
  protected readonly windowManager = inject(WindowManager);
  protected readonly desktopApps = OS_APPS.filter((app) => app.placement === 'desktop');
  protected readonly cornerApps = OS_APPS.filter((app) => app.placement === 'corner');
}
