import { Component } from '@angular/core';
import { HOBBIES } from '../../data/creative';

@Component({
  selector: 'app-games',
  template: `
    <div class="games">
      <p class="games__intro">Not everything is code. Here is what recharges me:</p>
      <ul class="games__list">
        @for (hobby of hobbies; track hobby.name) {
          <li class="games__item">
            <span class="games__emoji" aria-hidden="true">{{ hobby.emoji }}</span>
            <h3 class="games__name">{{ hobby.name }}</h3>
            <p class="games__description">{{ hobby.description }}</p>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    .games {
      padding: var(--space-4);
    }

    .games__intro {
      color: var(--color-text-muted);
    }

    .games__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .games__item {
      padding: var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface-raised);
    }

    .games__emoji {
      font-size: 2rem;
    }

    .games__name {
      margin: var(--space-2) 0 var(--space-1);
      font-size: var(--font-size-md);
    }

    .games__description {
      margin: 0;
      color: var(--color-text-muted);
      font-size: var(--font-size-sm);
    }
  `,
})
export class Games {
  protected readonly hobbies = HOBBIES;
}
