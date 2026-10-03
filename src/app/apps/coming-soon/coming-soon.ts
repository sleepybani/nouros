import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  template: `
    <div class="coming-soon">
      <p class="coming-soon__emoji" aria-hidden="true">🚧</p>
      <p>This app is still being built.</p>
      <p class="coming-soon__hint">Come back soon!</p>
    </div>
  `,
  styles: `
    .coming-soon {
      display: grid;
      place-content: center;
      height: 100%;
      padding: var(--space-8);
      text-align: center;
    }

    .coming-soon__emoji {
      font-size: 2.5rem;
    }

    .coming-soon__hint {
      color: var(--color-text-muted);
      font-family: var(--font-mono);
      font-size: var(--font-size-sm);
    }
  `,
})
export class ComingSoon {}
