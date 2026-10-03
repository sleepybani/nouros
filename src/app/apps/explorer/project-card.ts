import { Component, input, output } from '@angular/core';
import { Project } from '../../data/projects';

@Component({
  selector: 'app-project-card',
  template: `
    <button type="button" class="project-card" (click)="opened.emit(project().slug)">
      <img class="project-card__icon" src="icons/explorer.svg" alt="" width="40" height="40" />
      <span class="project-card__name">{{ project().name }}</span>
      <span class="project-card__tagline">{{ project().tagline }}</span>
      <span class="project-card__year">{{ project().year }}</span>
    </button>
  `,
  styles: `
    .project-card {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-areas:
        'icon name year'
        'icon tagline tagline';
      column-gap: var(--space-3);
      align-items: center;
      width: 100%;
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface-raised);
      text-align: left;
      cursor: pointer;
      transition: border-color 150ms ease;

      &:hover {
        border-color: var(--color-accent);
      }
    }

    .project-card__icon {
      grid-area: icon;
    }

    .project-card__name {
      grid-area: name;
      font-weight: 800;
    }

    .project-card__tagline {
      grid-area: tagline;
      color: var(--color-text-muted);
      font-size: var(--font-size-sm);
    }

    .project-card__year {
      grid-area: year;
      color: var(--color-text-muted);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly opened = output<string>();
}
