import { pickReminderForDate } from './reminders';

describe('pickReminderForDate', () => {
  const reminders = ['first', 'second', 'third'];

  it('returns the same reminder for the whole day', () => {
    const morning = new Date('2026-10-03T08:00:00Z');
    const evening = new Date('2026-10-03T22:00:00Z');

    expect(pickReminderForDate(morning, reminders)).toBe(pickReminderForDate(evening, reminders));
  });

  it('returns a different reminder the next day', () => {
    const today = new Date('2026-10-03T12:00:00Z');
    const tomorrow = new Date('2026-10-04T12:00:00Z');

    expect(pickReminderForDate(today, reminders)).not.toBe(
      pickReminderForDate(tomorrow, reminders),
    );
  });
});
