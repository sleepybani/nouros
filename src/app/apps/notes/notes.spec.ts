import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { APP_PARAMS } from '../../core/app-params';
import { AppParams } from '../../core/os-app';
import { NOTES, buildNewArticleUrl } from '../../data/notes';
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

  describe('articles published elsewhere', () => {
    const externalNote = NOTES.find((note) => note.externalUrl)!;

    it('links to the original article instead of loading a body', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch');
      params.set({ slug: externalNote.slug });

      await render();

      const readLink = page().querySelector<HTMLAnchorElement>('.notes__external-link')!;
      expect(readLink.href).toBe(externalNote.externalUrl);
      expect(readLink.textContent).toContain('Read on sfeir.dev');
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  describe('sharing', () => {
    beforeEach(() => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('Hello'));
      params.set({ slug: NOTES[0].slug });
    });

    it('shares the article link on LinkedIn', async () => {
      await render();

      const linkedInLink = Array.from(page().querySelectorAll<HTMLAnchorElement>('a')).find(
        (link) => link.textContent?.includes('LinkedIn'),
      )!;
      expect(linkedInLink.href).toContain('linkedin.com/sharing/share-offsite');
      expect(decodeURIComponent(linkedInLink.href)).toContain(`notes/${NOTES[0].slug}`);
    });

    it('copies the article link', async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
      await render();

      page().querySelector<HTMLButtonElement>('.note-share__button')!.click();
      await fixture.whenStable();

      expect(writeText).toHaveBeenCalledWith(expect.stringContaining(`notes/${NOTES[0].slug}`));
      expect(page().textContent).toContain('Link copied');
      vi.unstubAllGlobals();
    });
  });

  it('prepares a GitHub editor with an article template', () => {
    const editorUrl = new URL(buildNewArticleUrl(new Date('2026-10-05T12:00:00Z')));

    expect(editorUrl.pathname).toBe('/sleepybani/nouros/new/main/public/notes');
    expect(editorUrl.searchParams.get('value')).toContain('date: 2026-10-05');
    expect(editorUrl.searchParams.get('value')).toContain('category: dev');
  });
});
