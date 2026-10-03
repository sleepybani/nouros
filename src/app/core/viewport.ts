import { Injectable, Signal, signal } from '@angular/core';

/** Keep in sync with `$tablet-min` in src/styles/_breakpoints.scss. */
export const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

@Injectable({ providedIn: 'root' })
export class Viewport {
  readonly isMobile = this.watchMediaQuery(MOBILE_MEDIA_QUERY);

  private watchMediaQuery(query: string): Signal<boolean> {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return signal(false).asReadonly();
    }

    const mediaQuery = window.matchMedia(query);
    const matches = signal(mediaQuery.matches);
    mediaQuery.addEventListener('change', (event) => matches.set(event.matches));
    return matches.asReadonly();
  }
}
