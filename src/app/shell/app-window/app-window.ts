import { NgComponentOutlet } from '@angular/common';
import { Component, Injector, OnInit, Type, computed, inject, input, signal } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { APP_PARAMS } from '../../core/app-params';
import { findAppById } from '../../core/app-registry';
import { WindowManager, WindowState } from '../../core/window-manager';

@Component({
  selector: 'app-window',
  imports: [NgComponentOutlet],
  templateUrl: './app-window.html',
  styleUrl: './app-window.scss',
  host: {
    role: 'dialog',
    '[attr.aria-labelledby]': 'titleId()',
    '[class.app-window--focused]': 'isFocused()',
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
export class AppWindow implements OnInit {
  readonly state = input.required<WindowState>();

  private readonly launcher = inject(AppLauncher);
  private readonly windowManager = inject(WindowManager);

  protected readonly app = computed(() => findAppById(this.state().appId));
  protected readonly titleId = computed(() => `window-title-${this.state().appId}`);
  protected readonly isFocused = computed(() => this.windowManager.isFocused(this.state().appId));
  protected readonly appComponent = signal<Type<unknown> | undefined>(undefined);

  protected readonly appInjector = Injector.create({
    providers: [{ provide: APP_PARAMS, useValue: computed(() => this.state().params) }],
    parent: inject(Injector),
  });

  async ngOnInit(): Promise<void> {
    this.appComponent.set(await this.app().loadComponent());
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
