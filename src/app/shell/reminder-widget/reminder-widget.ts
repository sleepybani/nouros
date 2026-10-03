import { Component } from '@angular/core';
import { pickReminderForDate } from '../../data/reminders';

@Component({
  selector: 'app-reminder-widget',
  template: `
    <aside class="reminder" aria-label="Today's reminder">
      <p class="reminder__label">Today's reminder</p>
      <p class="reminder__text">{{ reminder }}</p>
    </aside>
  `,
  styles: `
    .reminder {
      width: 240px;
      padding: var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: rgb(31 28 46 / 0.7);
      backdrop-filter: blur(8px);
      box-shadow: var(--shadow-soft);
    }

    .reminder__label {
      margin-bottom: var(--space-1);
      color: var(--color-pink);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .reminder__text {
      margin: 0;
      font-weight: 600;
    }
  `,
})
export class ReminderWidget {
  protected readonly reminder = pickReminderForDate(new Date());
}
