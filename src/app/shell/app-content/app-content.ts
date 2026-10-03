import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  Injector,
  PendingTasks,
  Type,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { APP_PARAMS } from '../../core/app-params';
import { AppParams, OsApp } from '../../core/os-app';

/** Lazy-loads an app and gives it its route params. Used by desktop windows and mobile pages. */
@Component({
  selector: 'app-content',
  imports: [NgComponentOutlet],
  template: `
    @if (appComponent(); as component) {
      <ng-container *ngComponentOutlet="component; injector: appInjector" />
    } @else {
      <p class="app-content__loading">Loading…</p>
    }
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
      container-type: inline-size;
    }

    .app-content__loading {
      padding: var(--space-6);
      color: var(--color-text-muted);
      font-family: var(--font-mono);
    }
  `,
})
export class AppContent {
  readonly app = input.required<OsApp>();
  readonly params = input<AppParams>({});

  private readonly pendingTasks = inject(PendingTasks);
  protected readonly appComponent = signal<Type<unknown> | undefined>(undefined);

  protected readonly appInjector = Injector.create({
    providers: [{ provide: APP_PARAMS, useValue: this.params }],
    parent: inject(Injector),
  });

  constructor() {
    effect(() => {
      const app = this.app();
      untracked(() => this.load(app));
    });
  }

  private load(app: OsApp): void {
    this.appComponent.set(undefined);
    // Registered as a pending task so `whenStable()` (tests, SSR) waits for the app code to load.
    this.pendingTasks.run(async () => {
      const component = await app.loadComponent();
      if (this.app() === app) {
        this.appComponent.set(component);
      }
    });
  }
}
