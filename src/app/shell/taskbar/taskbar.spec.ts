import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { WindowManager } from '../../core/window-manager';

describe('Taskbar', () => {
  let harness: RouterTestingHarness;

  const taskbar = () => (harness.routeNativeElement as HTMLElement).querySelector('.taskbar')!;
  const windowButtons = () =>
    Array.from(taskbar().querySelectorAll<HTMLButtonElement>('.taskbar__window'));

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    harness = await RouterTestingHarness.create('/');
  });

  it('shows the statuses', () => {
    expect(taskbar().textContent).toContain('Mood: creative but debugging');
  });

  it('lists the open windows and highlights the focused one', async () => {
    await harness.navigateByUrl('/terminal');
    await harness.navigateByUrl('/contact');

    expect(windowButtons().map((button) => button.textContent?.trim())).toEqual([
      'Terminal',
      'Mail',
    ]);
    expect(windowButtons()[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('minimizes the focused window when its button is clicked', async () => {
    await harness.navigateByUrl('/terminal');

    windowButtons()[0].click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(WindowManager).windows()[0].minimized).toBe(true);
    expect(TestBed.inject(Router).url).toBe('/');
  });

  it('opens the CV from the Quick CV button', async () => {
    taskbar().querySelector<HTMLButtonElement>('.taskbar__cv')!.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/cv');
  });
});
