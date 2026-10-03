import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';

function pretendScreenIsMobile(): void {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: true,
    media: query,
    addEventListener: () => undefined,
  }));
}

describe('MobileLauncher', () => {
  let harness: RouterTestingHarness;
  const page = () => harness.routeNativeElement as HTMLElement;

  beforeEach(async () => {
    pretendScreenIsMobile();
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    harness = await RouterTestingHarness.create('/');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the launcher instead of the desktop', () => {
    expect(page().querySelector('app-mobile-launcher')).not.toBeNull();
    expect(page().querySelector('app-desktop')).toBeNull();
  });

  it('shows one card per app, plus a Quick CV button', () => {
    const cardTitles = Array.from(page().querySelectorAll('.mobile-home__card-title')).map(
      (title) => title.textContent,
    );

    expect(cardTitles).toEqual([
      'Explorer',
      'Terminal',
      'Mail',
      'Notes',
      'Paint.exe',
      'Games',
      'Trash',
    ]);
    expect(page().querySelector('.mobile-home__pinned')?.textContent).toContain('Quick CV');
  });

  it('opens an app as a full page and comes back home', async () => {
    page().querySelector<HTMLButtonElement>('.mobile-home__card')!.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/projects');
    expect(page().querySelector('.mobile-page__title')?.textContent).toBe('Explorer');
    expect(page().querySelector('app-explorer')).not.toBeNull();

    page().querySelector<HTMLButtonElement>('.mobile-page__back')!.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/');
    expect(page().querySelector('.mobile-home__cards')).not.toBeNull();
  });

  it('supports deep links', async () => {
    await harness.navigateByUrl('/projects/kc-media');
    await harness.fixture.whenStable();

    expect(page().querySelector('.project-detail__name')?.textContent).toBe('KC Media');
  });
});
