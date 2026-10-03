export const DAILY_REMINDERS: readonly string[] = [
  'Good UX should feel obvious.',
  'Name things so future-you understands them.',
  'Ship small, ship often.',
  'A bug is just a question the code is asking you.',
  'Accessibility is not a feature, it is the baseline.',
  'Rest is part of the build process.',
  'Make it work, make it clear, then make it pretty.',
];

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

/** Same reminder all day long, a different one the next day. */
export function pickReminderForDate(date: Date, reminders = DAILY_REMINDERS): string {
  const daysSinceEpoch = Math.floor(date.getTime() / MILLISECONDS_PER_DAY);
  return reminders[daysSinceEpoch % reminders.length];
}
