import { Component, inject } from '@angular/core';
import { Viewport } from '../../core/viewport';
import { Desktop } from '../desktop/desktop';
import { MobileLauncher } from '../mobile-launcher/mobile-launcher';

/** Phones get a simple launcher with cards: a fake desktop on a small screen is a bad experience. */
@Component({
  selector: 'app-shell',
  imports: [Desktop, MobileLauncher],
  template: `
    @if (viewport.isMobile()) {
      <app-mobile-launcher />
    } @else {
      <app-desktop />
    }
  `,
})
export class Shell {
  protected readonly viewport = inject(Viewport);
}
