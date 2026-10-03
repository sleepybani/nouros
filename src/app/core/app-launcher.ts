import { Injectable, effect, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { findAppById, findAppByRoute } from './app-registry';
import { AppId, AppParams, OsApp } from './os-app';
import { WindowManager } from './window-manager';

export interface AppLocation {
  app: OsApp;
  params: AppParams;
}

/**
 * The only entry point the UI uses to open, focus, minimize or close apps.
 * The URL is the source of truth for the focused app: `/projects/ev-on` means
 * "Explorer is in front, showing EV-ON". This keeps links shareable.
 */
@Injectable({ providedIn: 'root' })
export class AppLauncher {
  private readonly router = inject(Router);
  private readonly windowManager = inject(WindowManager);

  readonly currentLocation = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.readLocationFromUrl()),
    ),
    { requireSync: true },
  );

  constructor() {
    effect(() => {
      const location = this.currentLocation();
      if (location) {
        untracked(() => this.windowManager.open(location.app.id, location.params));
      }
    });
  }

  launch(app: OsApp, slug?: string): void {
    const path = slug ? ['/', app.route, slug] : ['/', app.route];
    this.router.navigate(path);
  }

  focus(appId: AppId): void {
    const appWindow = this.windowManager.windows().find((candidate) => candidate.appId === appId);
    this.launch(findAppById(appId), appWindow?.params['slug']);
  }

  close(appId: AppId): void {
    this.windowManager.close(appId);
    this.showFocusedWindowInUrl();
  }

  minimize(appId: AppId): void {
    this.windowManager.minimize(appId);
    this.showFocusedWindowInUrl();
  }

  toggleFromTaskbar(appId: AppId): void {
    if (this.windowManager.isFocused(appId)) {
      this.minimize(appId);
    } else {
      this.focus(appId);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  private showFocusedWindowInUrl(): void {
    const focusedWindow = this.windowManager.focusedWindow();
    if (focusedWindow) {
      this.focus(focusedWindow.appId);
    } else {
      this.goHome();
    }
  }

  private readLocationFromUrl(): AppLocation | undefined {
    const segments = this.router.parseUrl(this.router.url).root.children['primary']?.segments ?? [];
    const [appSegment, slugSegment] = segments.map((segment) => segment.path);
    const app = appSegment ? findAppByRoute(appSegment) : undefined;
    if (!app) {
      return undefined;
    }
    return { app, params: slugSegment ? { slug: slugSegment } : {} };
  }
}
