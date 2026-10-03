import { Component, inject, input } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { OsApp } from '../../core/os-app';

@Component({
  selector: 'app-desktop-icon',
  template: `
    <button type="button" class="desktop-icon" (click)="launcher.launch(app())">
      <img class="desktop-icon__image" [src]="app().icon" alt="" width="48" height="48" />
      <span class="desktop-icon__title">{{ app().title }}</span>
      <span class="desktop-icon__subtitle">{{ app().subtitle }}</span>
    </button>
  `,
  styleUrl: './desktop-icon.scss',
})
export class DesktopIcon {
  readonly app = input.required<OsApp>();
  protected readonly launcher = inject(AppLauncher);
}
