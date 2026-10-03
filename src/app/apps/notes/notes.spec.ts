import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { APP_PARAMS } from '../../core/app-params';
import { AppParams } from '../../core/os-app';
import { NOTES } from '../../data/notes';
import { Notes } from './notes';

describe('Notes', () => {
  const params = signal<AppParams>({});
  let fixture: ComponentFixture<Notes>;
  const page = () => fixture.nativeElement as HTMLElement;

  const render = async () => {
    fixture = TestBed.createComponent(Notes);
    await fixture.whenStable();
  };

  beforeEach(() => {
    params.set({});
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: APP_PARAMS, useValue: params }],
    });
  });

  afterEach(() => vi.restoreAllMocks());

  it('lists the notes and invites to pick one', async () => {
    await render();

    expect(page().querySelectorAll('.notes__item')).toHaveLength(NOTES.length);
    expect(page().textContent).toContain('Pick a note');
  });

  it('opens the note URL when a note is clicked', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await render();

    page().querySelector<HTMLButtonElement>('.notes__item')!.click();

    expect(navigate).toHaveBeenCalledWith(['/', 'notes', NOTES[0].slug]);
  });

  it('renders the Markdown of the opened note', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('## Hello\n\nSome **bold** text'));
    params.set({ slug: NOTES[0].slug });

    await render();

    expect(page().querySelector('.prose h2')?.textContent).toBe('Hello');
    expect(page().querySelector('.prose strong')?.textContent).toBe('bold');
  });

  it('shows an error when the note file is missing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 404 }));
    params.set({ slug: NOTES[0].slug });

    await render();

    expect(page().querySelector('[role="alert"]')?.textContent).toContain('could not be loaded');
  });
});
