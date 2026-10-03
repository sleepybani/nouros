import { Component, inject, signal } from '@angular/core';
import { Viewport } from '../../core/viewport';
import { BootScreen } from '../boot-screen/boot-screen';
import {
  hasBootedThisSession,
  prefersReducedMotion,
  rememberBootedThisSession,
} from '../boot-screen/boot-session';
import { Desktop } from '../desktop/desktop';
import { MobileLauncher } from '../mobile-launcher/mobile-launcher';

/** Phones get a simple launcher with cards: a fake desktop on a small screen is a bad experience. */
@Component({
  selector: 'app-shell',
  imports: [BootScreen, Desktop, MobileLauncher],
  template: `
    @if (viewport.isMobile()) {
      <app-mobile-launcher />
    } @else {
      <app-desktop />
    }

    @if (isBooting()) {
      <app-boot-screen (finished)="finishBoot()" />
    }
  `,
})
export class Shell {
  protected readonly viewport = inject(Viewport);
  protected readonly isBooting = signal(!hasBootedThisSession() && !prefersReducedMotion());

  protected finishBoot(): void {
    rememberBootedThisSession();
    this.isBooting.set(false);
  }
}
