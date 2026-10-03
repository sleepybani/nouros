import { Component, inject } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { OS_APPS } from '../../core/app-registry';
import { PROFILE, TASKBAR_STATUSES } from '../../data/profile';
import { AppContent } from '../app-content/app-content';
import { ReminderWidget } from '../reminder-widget/reminder-widget';

@Component({
  selector: 'app-mobile-launcher',
  imports: [AppContent, ReminderWidget],
  templateUrl: './mobile-launcher.html',
  styleUrl: './mobile-launcher.scss',
})
export class MobileLauncher {
  protected readonly launcher = inject(AppLauncher);
  protected readonly profile = PROFILE;
  protected readonly statuses = TASKBAR_STATUSES;
  protected readonly cardApps = OS_APPS.filter((app) => app.placement !== 'taskbar');
  protected readonly pinnedApps = OS_APPS.filter((app) => app.placement === 'taskbar');
}
