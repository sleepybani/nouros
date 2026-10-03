import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { WindowManager } from '../../core/window-manager';

describe('Desktop', () => {
  let harness: RouterTestingHarness;
  let windowManager: WindowManager;

  const page = () => harness.routeNativeElement as HTMLElement;
  const openWindowTitles = () =>
    Array.from(page().querySelectorAll('app-window:not([hidden]) h2')).map((title) =>
      title.textContent?.trim(),
    );

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    harness = await RouterTestingHarness.create('/');
    windowManager = TestBed.inject(WindowManager);
  });

  it('shows the 6 desktop icons and the trash in the corner', () => {
    const iconLabels = Array.from(page().querySelectorAll('.desktop__icons button')).map(
      (button) => button.querySelector('.desktop-icon__title')?.textContent,
    );

    expect(iconLabels).toEqual(['Explorer', 'Terminal', 'Mail', 'Notes', 'Paint.exe', 'Games']);
    expect(page().querySelector('.desktop__corner')?.textContent).toContain('Trash');
  });

  it('opens a window and updates the URL when an icon is clicked', async () => {
    const terminalIcon = Array.from(
      page().querySelectorAll<HTMLButtonElement>('.desktop-icon'),
    ).find((button) => button.textContent?.includes('Terminal'));

    terminalIcon?.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/terminal');
    expect(openWindowTitles()).toEqual(['Terminal']);
  });

  it('opens the right window from a deep link', async () => {
    await harness.navigateByUrl('/projects/ev-on');

    expect(windowManager.focusedWindow()?.appId).toBe('explorer');
    expect(windowManager.focusedWindow()?.params).toEqual({ slug: 'ev-on' });
  });

  it('redirects unknown URLs to the desktop', async () => {
    await harness.navigateByUrl('/not-an-app');

    expect(TestBed.inject(Router).url).toBe('/');
    expect(windowManager.windows()).toEqual([]);
  });

  it('goes back to the previous window URL when the focused window is closed', async () => {
    await harness.navigateByUrl('/terminal');
    await harness.navigateByUrl('/contact');

    page().querySelector<HTMLButtonElement>('[aria-label="Close Mail"]')?.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/terminal');
    expect(openWindowTitles()).toEqual(['Terminal']);
  });

  it('moves a window when its title bar is dragged', async () => {
    await harness.navigateByUrl('/terminal');
    const start = windowManager.windows()[0];
    const titlebar = page().querySelector<HTMLElement>('.app-window__titlebar')!;

    titlebar.dispatchEvent(
      new MouseEvent('pointerdown', { button: 0, clientX: 200, clientY: 60, bubbles: true }),
    );
    titlebar.dispatchEvent(
      new MouseEvent('pointermove', { clientX: 300, clientY: 160, bubbles: true }),
    );
    titlebar.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));

    const moved = windowManager.windows()[0];
    expect(moved.x).toBe(start.x + 100);
    expect(moved.y).toBe(start.y + 100);
  });

  it('never drags a window off screen', async () => {
    await harness.navigateByUrl('/terminal');
    const titlebar = page().querySelector<HTMLElement>('.app-window__titlebar')!;

    titlebar.dispatchEvent(
      new MouseEvent('pointerdown', { button: 0, clientX: 200, clientY: 60, bubbles: true }),
    );
    titlebar.dispatchEvent(
      new MouseEvent('pointermove', { clientX: -5000, clientY: -5000, bubbles: true }),
    );

    expect(windowManager.windows()[0].x).toBe(0);
    expect(windowManager.windows()[0].y).toBe(0);
  });
});
