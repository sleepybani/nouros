import { Component, computed, inject, input } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { APP_PARAMS } from '../../core/app-params';
import { findAppById } from '../../core/app-registry';
import { ARTIST_NOTES, ARTWORKS, Artwork, NOUROS_PALETTE } from '../../data/creative';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.html',
  styleUrl: './paint.scss',
})
export class Paint {
  readonly artworks = input<readonly Artwork[]>(ARTWORKS);

  private readonly launcher = inject(AppLauncher);
  private readonly appParams = inject(APP_PARAMS);
  private readonly paintApp = findAppById('paint');

  protected readonly palette = NOUROS_PALETTE;
  protected readonly artistNotes = ARTIST_NOTES;
  protected readonly openedArtwork = computed(() => {
    const slug = this.appParams()['slug'];
    return this.artworks().find((artwork) => artwork.slug === slug);
  });

  protected openArtwork(artwork: Artwork): void {
    this.launcher.launch(this.paintApp, artwork.slug);
  }

  protected backToGallery(): void {
    this.launcher.launch(this.paintApp);
  }
}
