import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { APP_PARAMS } from '../../core/app-params';
import { AppParams } from '../../core/os-app';
import { ARTIST_NOTES, Artwork, NOUROS_PALETTE } from '../../data/creative';
import { Paint } from './paint';

describe('Paint', () => {
  const params = signal<AppParams>({});
  let fixture: ComponentFixture<Paint>;
  const page = () => fixture.nativeElement as HTMLElement;

  const sunset: Artwork = {
    slug: 'sunset',
    title: 'Sunset over Reichstett',
    year: 2025,
    medium: 'Acrylic on canvas',
    image: 'paintings/sunset.webp',
    description: 'Pink and lavender, of course.',
  };

  const render = async (artworks: readonly Artwork[] = []) => {
    fixture = TestBed.createComponent(Paint);
    fixture.componentRef.setInput('artworks', artworks);
    await fixture.whenStable();
  };

  beforeEach(() => {
    params.set({});
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: APP_PARAMS, useValue: params }],
    });
  });

  it('shows the palette and the artist notes', async () => {
    await render();

    expect(page().querySelectorAll('.paint__swatch')).toHaveLength(NOUROS_PALETTE.length);
    expect(page().textContent).toContain(ARTIST_NOTES[0]);
  });

  it('shows a friendly empty state without paintings', async () => {
    await render();

    expect(page().textContent).toContain('The gallery is being hung.');
  });

  it('shows the gallery when there are paintings', async () => {
    await render([sunset]);

    expect(page().querySelector('.paint__thumbnail')?.textContent).toContain(sunset.title);
  });

  it('shows one painting in large when its slug is in the URL', async () => {
    params.set({ slug: 'sunset' });
    await render([sunset]);

    expect(page().querySelector('figcaption h3')?.textContent).toBe(sunset.title);
  });
});
