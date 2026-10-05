import { Component, computed, input, signal } from '@angular/core';
import { Note } from '../../data/notes';

const COPIED_MESSAGE_MS = 2000;

@Component({
  selector: 'app-note-share',
  template: `
    <div class="note-share" role="group" aria-label="Share this article">
      <button type="button" class="note-share__button" (click)="copyLink()">
        {{ copied() ? '✓ Link copied' : '🔗 Copy link' }}
      </button>
      <a class="note-share__button" [href]="linkedInShareUrl()" target="_blank" rel="noopener">
        Share on LinkedIn ↗
      </a>
      @if (canUseNativeShare) {
        <button type="button" class="note-share__button" (click)="shareNatively()">
          📤 Share…
        </button>
      }
    </div>
  `,
  styles: `
    .note-share {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin: var(--space-3) 0 var(--space-4);
    }

    .note-share__button {
      padding: var(--space-1) var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: 999px;
      background: transparent;
      color: var(--color-text);
      font-size: var(--font-size-sm);
      text-decoration: none;
      cursor: pointer;

      &:hover {
        border-color: var(--color-accent);
      }
    }
  `,
})
export class NoteShare {
  readonly note = input.required<Note>();

  protected readonly copied = signal(false);
  protected readonly canUseNativeShare = typeof navigator.share === 'function';

  /** External articles are shared with their original link: it has the right preview. */
  protected readonly shareUrl = computed(
    () => this.note().externalUrl ?? new URL(`notes/${this.note().slug}`, document.baseURI).href,
  );
  protected readonly linkedInShareUrl = computed(
    () =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl())}`,
  );

  protected async copyLink(): Promise<void> {
    await navigator.clipboard.writeText(this.shareUrl());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), COPIED_MESSAGE_MS);
  }

  protected async shareNatively(): Promise<void> {
    try {
      await navigator.share({ title: this.note().title, url: this.shareUrl() });
    } catch {
      // The visitor closed the share sheet: nothing to do.
    }
  }
}
