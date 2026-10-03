import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { APP_PARAMS } from '../../core/app-params';
import { AppParams } from '../../core/os-app';
import { PROJECTS } from '../../data/projects';
import { Explorer } from './explorer';

describe('Explorer', () => {
  const params = signal<AppParams>({});

  const render = async () => {
    const fixture = TestBed.createComponent(Explorer);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };

  beforeEach(() => {
    params.set({});
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: APP_PARAMS, useValue: params }],
    });
  });

  it('lists every project', async () => {
    const page = await render();

    expect(page.querySelectorAll('app-project-card')).toHaveLength(PROJECTS.length);
    expect(page.querySelector('.explorer__path')?.textContent).toBe('~/projects');
  });

  it('opens a project URL when a card is clicked', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const page = await render();

    page.querySelector<HTMLButtonElement>('.project-card')!.click();

    expect(navigate).toHaveBeenCalledWith(['/', 'projects', PROJECTS[0].slug]);
  });

  it('shows the project details when a slug is given', async () => {
    params.set({ slug: 'kc-media' });
    const page = await render();

    expect(page.querySelector('.project-detail__name')?.textContent).toBe('KC Media');
    expect(page.textContent).toContain('NestJS');
    expect(page.querySelector('.explorer__path')?.textContent).toBe('~/projects/kc-media');
  });

  it('shows a friendly message for an unknown project', async () => {
    params.set({ slug: 'nope' });
    const page = await render();

    expect(page.textContent).toContain('File not found');
  });
});
