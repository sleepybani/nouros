export interface TaskbarStatus {
  label: string;
  value: string;
}

export const PROFILE = {
  name: 'Nour',
  role: 'Full-stack JS developer',
  tagline:
    'Welcome to NourOS — a tiny operating system built with code, color, caffeine, and controlled chaos.',
  location: 'Strasbourg / Reichstett',
  links: {
    github: 'https://github.com/sleepybani',
    linkedin: '',
    email: '',
  },
  /** Formspree (or similar) endpoint, e.g. https://formspree.io/f/abcd1234. Empty = mailto fallback. */
  contactFormEndpoint: '',
};

export const TASKBAR_STATUSES: readonly TaskbarStatus[] = [
  { label: 'Focus mode', value: 'ON' },
  { label: 'Currently building', value: 'better interfaces' },
  { label: 'Mood', value: 'creative but debugging' },
  { label: 'Location', value: PROFILE.location },
];
